const CHAIN_IDS = require("../constants/chainIds.json");
const ENDPOINTS = require("../constants/layerzeroEndpoints.json");
const { getDeploymentAddresses } = require("../utils/readStatic");

module.exports = async function (taskArgs, hre) {
  const signers = await ethers.getSigners();
  const owner = signers[0];
  console.log(`My address: ${owner.address}`);
  let toAddress = owner.address;
  const remoteChainId = CHAIN_IDS[taskArgs.targetNetwork];

  let qty = ethers.utils.parseUnits(taskArgs.qty, 6);
  let minQty = qty.mul(6).div(100);

  // sends from local contract (proxy) to OFT on remote chain

  let localContractInstance = await ethers.getContract("ProxyOFT");

  // quote fee with default adapterParams
  let adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint256"],
    [1, 200000]
  ); // default adapterParams example

  let toAddressBytes32 = ethers.utils.defaultAbiCoder.encode(
    ["address"],
    [toAddress]
  );
  console.log({ toAddressBytes32 });

  let fees = await localContractInstance.estimateSendFee(
    remoteChainId,
    toAddressBytes32,
    qty,
    false,
    adapterParams
  );
  console.log(
    `fees[0] (wei): ${fees[0]} / (eth): ${ethers.utils.formatEther(fees[0])}`
  );

  // get deployed remote contract address
  let remoteContract = "OFTToken";
  const remoteAddress = getDeploymentAddresses(taskArgs.targetNetwork)[
    remoteContract
  ];

  console.log(`Sending ${qty} OFT to ${toAddress} on ${remoteAddress}`);

  tx = await (
    await localContractInstance.sendFrom(
      owner.address, // 'from' address to send tokens
      remoteChainId, // remote LayerZero chainId
      toAddressBytes32, // 'to' address to send tokens
      qty, // amount of tokens to send (in wei)
      minQty, // min amount of tokens to send (in wei)
      {
        refundAddress: owner.address, // refund address (if too much message fee is sent, it gets refunded)
        zroPaymentAddress: ethers.constants.AddressZero, // address(0x0) if not paying in ZRO (LayerZero Token)
        adapterParams: "0x", // flexible bytes array to indicate messaging adapter services
      },
      { value: fees[0] }
    )
  ).wait();

  console.log(
    `✅ Message Sent [${hre.network.name}] sendTokens() to OFT @ LZ chainId[${remoteChainId}] token:[${toAddress}]`
  );
  console.log(` tx: ${tx.transactionHash}`);
  console.log(
    `* check your address [${owner.address}] on the destination chain, in the ERC20 transaction tab !"`
  );
};
