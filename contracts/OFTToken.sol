pragma solidity ^0.8.0;

import "@layerzerolabs/solidity-examples/contracts/token/oft/v2/fee/OFTWithFee.sol";

contract OFTToken is OFTWithFee {
    constructor(
        address _lzEndpoint
    ) OFTWithFee("XDOLLAR", "XDOLLAR", 6, _lzEndpoint) {}
}
