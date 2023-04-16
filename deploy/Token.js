module.exports = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(`Network: ${hre.network.name}`);

  await deploy("Token", {
    from: deployer,
    args: ["XDOLLAR", "XDOLLAR", 6, 1000000000],
    log: true,
    waitConfirmations: 1,
    skipIfAlreadyDeployed: true,
  });
};

module.exports.tags = ["Token"];
