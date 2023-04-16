const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json");

module.exports = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(`>>> your address: ${deployer}`);

  const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name];
  console.log(`[${hre.network.name}] Endpoint Address: ${lzEndpointAddress}`);

  // args: [tokenAddress, lzEndpointAddress]
  await deploy("ProxyOFT", {
    from: deployer,
    args: ["0x996e6C9bed00969E429478Ec7dF956624b4D5668", lzEndpointAddress],
    log: true,
    waitConfirmations: 1,
  });
};

module.exports.tags = ["ProxyOFT"];
