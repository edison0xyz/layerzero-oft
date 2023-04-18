task(
  "setTrustedRemote",
  "setTrustedRemote(chainId, sourceAddr) to enable inbound/outbound messages with your other contracts",
  require("./setTrustedRemote")
)
  .addParam("targetNetwork", "the target network to set as a trusted remote")
  .addOptionalParam(
    "local",
    "Name of local contract if the names are different"
  )
  .addOptionalParam(
    "remote",
    "Name of remote contract if the names are different"
  )
  .addOptionalParam("contract", "If both contracts are the same name");

task(
  "proxySend",
  "proxySend() send token to other chain",
  require("./proxySend")
)
  .addParam("qty", "quantity of token to be sent")
  .addParam("targetNetwork", "the target network to sent to");

task("oftSend", "oftSend() send token to other chain", require("./oftSend"))
  .addParam("qty", "quantity of token to be sent")
  .addParam("targetNetwork", "the target network to sent to");
