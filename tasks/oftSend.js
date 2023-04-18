const CHAIN_ID = require("../constants/chainIds.json");

module.exports = async function (taskArgs, hre) {
  let signers = await ethers.getSigners();
  let owner = signers[0];
  let toAddress = owner.address;
  let qty = ethers.utils.parseUnits(taskArgs.qty, 6);

  let localContract, remoteContract;

  console.log(`Sending address from ${owner.address}`);

  // send from OFTToken to ProxyOFT
  localContract = "OFTToken";
  remoteContract = "ProxyOFT";

  let toAddressBytes32 = ethers.utils.defaultAbiCoder.encode(
    ["address"],
    [toAddress]
  );
  console.log({ toAddressBytes32 });

  // get remote chain id
  const remoteChainId = CHAIN_ID[taskArgs.targetNetwork];

  // get local contract
  const localContractInstance = await ethers.getContract(localContract);

  // quote fee with default adapterParams
  let adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint256"],
    [1, 200000]
  ); // default adapterParams example

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

  console.log(`Sending address from ${owner.address}`);

  console.log(ethers.constants.AddressZero);

  tx = await (
    await localContractInstance.sendFrom(
      owner.address, // 'from' address to send tokens
      remoteChainId, // remote LayerZero chainId
      toAddressBytes32, // 'to' address to send tokens
      qty, // amount of tokens to send (in wei)
      {
        refundAddress: owner.address, // refund address (if too much message fee is sent, it gets refunded)
        zroPaymentAddress: ethers.constants.AddressZero, // address(0x0)
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
