// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@layerzerolabs/solidity-examples/contracts/token/oft/v2/fee/ProxyOFTWithFee.sol";

contract ProxyOFT is ProxyOFTWithFee {
    constructor(
        address _token,
        address _lzEndpoint
    ) ProxyOFTWithFee(_token, 6, _lzEndpoint) {}
}
