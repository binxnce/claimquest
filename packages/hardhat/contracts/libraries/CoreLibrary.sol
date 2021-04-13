pragma solidity ^0.8.4;


library CoreLibrary{

     struct UserReserveData {

        uint40 lastUpdateTimestamp;

    }
    struct ReserveData {
        //the decimals of the reserve asset
        uint256 decimals;
        /**
        * @dev address of the aToken representing the asset
        **/
        address aTokenAddress;
        /**
        * @dev address of the interest rate strategy contract
        **/
        address interestRateStrategyAddress;
        // isActive = true means the reserve has been activated and properly configured
        bool isActive;
        // isFreezed = true means the reserve only allows repays and redeems, but not deposits, new borrowings or rate swap
        bool isFreezed;
    }
}
