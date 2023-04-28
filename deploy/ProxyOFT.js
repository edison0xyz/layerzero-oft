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
    args: ["0xA66Befc07250B0493787F8DC19380752F80F138b", lzEndpointAddress],
    log: true,
    waitConfirmations: 1,
  });
};

module.exports.tags = ["ProxyOFT"];
