//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "openzeppelin-solidity/contracts/utils/Address.sol";

import "../libraries/CoreLibrary.sol";
import "../configuration/PoolAddressesProvider.sol";
import "../tokenization/AToken.sol";
import "../libraries/EthAddressLib.sol";

contract DefaultPool  {
    using SafeMath for uint256;
    // using WadRayMath for uint256;
    using CoreLibrary for CoreLibrary.ReserveData;
    using CoreLibrary for CoreLibrary.UserReserveData;
    using Address for address payable;

    /**
    * @dev Emitted when the state of a reserve is updated
    * @param reserve the address of the reserve
    **/
    event ReserveUpdated(
        address indexed reserve
    );

    mapping(address => CoreLibrary.ReserveData) internal reserves;
    mapping(address => mapping(address => CoreLibrary.UserReserveData)) internal usersReserveData;

    address[] public reservesList;

    Address owner;

    /**
    * @dev only lending pools can use functions affected by this modifier
    **/
    modifier onlyPool {
        require(owner == msg.sender, "The caller must be the owner contract");
        _;
    }

    /**
    * @dev only lending pools configurator can use functions affected by this modifier
    **/
    modifier onlyPoolConfigurator {
        require(
            addressesProvider.getPoolConfigurator() == msg.sender,
            "The caller must be a pool configurator contract"
        );
        _;
    }

    constructor(Address _owner){
        owner = _owner;
        initR
    }

    /**
    * @dev updates the state of the core as a result of a deposit action
    * @param _reserve the address of the reserve in which the deposit is happening
    * @param _user the address of the the user depositing
    * @param _amount the amount being deposited
    **/

    function updateStateOnDeposit(
        address _reserve,
        address _user,
        uint256 _amount,
    ) external onlyPool {
        //TODO
    }

    /**
    * @dev updates the state of the core as a result of a stake action
    * @param _reserve the address of the reserve in which the deposit is happening
    * @param _user the address of the the user depositing
    * @param _amount the amount being deposited
    **/

    function updateStateOnStake(
        address _reserve,
        address _user,
        uint256 _amount,
    ) external onlyPool {
        //TODO
    }


   /**
    * @dev updates the state of the core as a result of a stake action
    * @param _reserve the address of the reserve in which the deposit is happening
    * @param _user the address of the the user depositing
    * @param _amount the amount being deposited
    **/

    function updateStateOnStakeComplete(
        address _reserve,
        address _user,
        uint256 _amount,
    ) external onlyPool {
        //TODO
    }

    /**
    * @dev updates the state of the core as a result of a stake action
    * @param _reserve the address of the reserve in which the deposit is happening
    * @param _user the address of the the user depositing
    * @param _amount the amount being deposited
    **/

    function updateStateOnStakeLost(
        address _reserve,
        address _user,
        uint256 _amount,
    ) external onlyPool {
        //TODO
    }

    /**
    * @dev updates the state of the core as a result of a redeem action
    * @param _reserve the address of the reserve in which the redeem is happening
    * @param _user the address of the the user redeeming
    * @param _amountRedeemed the amount being redeemed
    **/
    function updateStateOnRedeem(
        address _reserve,
        address _user,
        uint256 _amountRedeemed,
    ) external onlyPool {

        //TODO
    }

    /**
    * @notice ETH/token transfer functions
    **/

    /**
    * @dev fallback function enforces that the caller is a contract
    **/
    fallback() external payable {
        //TODO
        //only contracts can send ETH to the core
        require(msg.sender.isContract(), "Only contracts can send ether to the Lending pool core");

    }

    /**
    * @dev transfers to the user a specific amount from the reserve.
    * @param _reserve the address of the reserve where the transfer is happening
    * @param _user the address of the user receiving the transfer
    * @param _amount the amount being transferred
    **/
    function transferToUser(address _reserve, address payable _user, uint256 _amount)
        external
        onlyPool
    {
        if (_reserve != EthAddressLib.ethAddress()) {
            ERC20(_reserve).safeTransfer(_user, _amount);
        } else {
            //solium-disable-next-line
            (bool result, ) = _user.call.value(_amount).gas(50000)("");
            require(result, "Transfer of ETH failed");
        }
    }

    /**
    * @dev transfers an amount from a user to the destination reserve
    * @param _reserve the address of the reserve where the amount is being transferred
    * @param _user the address of the user from where the transfer is happening
    * @param _amount the amount being transferred
    **/
    function transferToReserve(address _reserve, address payable _user, uint256 _amount)
        external
        payable
        onlyLendingPool
    {
        if (_reserve != EthAddressLib.ethAddress()) {
            require(msg.value == 0, "User is sending ETH along with the ERC20 transfer.");
            ERC20(_reserve).safeTransferFrom(_user, address(this), _amount);

        } else {
            require(msg.value >= _amount, "The amount and the value sent to deposit do not match");

            if (msg.value > _amount) {
                //send back excess ETH
                uint256 excessAmount = msg.value.sub(_amount);
                //solium-disable-next-line
                (bool result, ) = _user.call.value(excessAmount).gas(50000)("");
                require(result, "Transfer of ETH failed");
            }
        }
    }

    /**
    * @dev gets the underlying asset balance of a user based on the corresponding aToken balance.
    * @param _reserve the reserve address
    * @param _user the user address
    * @return the underlying deposit balance of the user
    **/

    function getUserUnderlyingAssetBalance(address _reserve, address _user)
        public
        view
        returns (uint256)
    {
        AToken aToken = AToken(reserves[_reserve].aTokenAddress);
        return aToken.balanceOf(_user);

    }


    /**
    * @dev gets the aToken contract address for the reserve
    * @param _reserve the reserve address
    * @return the address of the aToken contract
    **/

    function getReserveATokenAddress(address _reserve) public view returns (address) {
        CoreLibrary.ReserveData storage reserve = reserves[_reserve];
        return reserve.aTokenAddress;
    }

    /**
    * @dev gets the available liquidity in the reserve. The available liquidity is the balance of the core contract
    * @param _reserve the reserve address
    * @return the available liquidity
    **/
    function getReserveAvailableLiquidity(address _reserve) public view returns (uint256) {
        uint256 balance = 0;

        if (_reserve == EthAddressLib.ethAddress()) {
            balance = address(this).balance;
        } else {
            balance = IERC20(_reserve).balanceOf(address(this));
        }
        return balance;
    }

    /**
    * @dev gets the total liquidity in the reserve. The total liquidity is the balance of the core contract + total borrows
    * @param _reserve the reserve address
    * @return the total liquidity
    **/
    function getReserveTotalLiquidity(address _reserve) public view returns (uint256) {
        CoreLibrary.ReserveData storage reserve = reserves[_reserve];
        return getReserveAvailableLiquidity(_reserve).add(reserve.getTotalBorrows());
    }

    /**
    * @dev gets the normalized income of the reserve. a value of 1e27 means there is no income. A value of 2e27 means there
    * there has been 100% income.
    * @param _reserve the reserve address
    * @return the reserve normalized income
    **/
    function getReserveNormalizedIncome(address _reserve) external view returns (uint256) {
        CoreLibrary.ReserveData storage reserve = reserves[_reserve];
        return reserve.getNormalizedIncome();
    }

    /**
    * @dev returns true if the reserve is active
    * @param _reserve the reserve address
    * @return true if the reserve is active, false otherwise
    **/
    function getReserveIsActive(address _reserve) external view returns (bool) {
        CoreLibrary.ReserveData storage reserve = reserves[_reserve];
        return reserve.isActive;
    }

    /**
    * @notice returns if a reserve is freezed
    * @param _reserve the reserve for which the information is needed
    * @return true if the reserve is freezed, false otherwise
    **/

    function getReserveIsFreezed(address _reserve) external view returns (bool) {
        CoreLibrary.ReserveData storage reserve = reserves[_reserve];
        return reserve.isFreezed;
    }

    /**
    * @notice returns the timestamp of the last action on the reserve
    * @param _reserve the reserve for which the information is needed
    * @return the last updated timestamp of the reserve
    **/

    function getReserveLastUpdate(address _reserve) external view returns (uint40 timestamp) {
        CoreLibrary.ReserveData storage reserve = reserves[_reserve];
        timestamp = reserve.lastUpdateTimestamp;
    }

   /**
    * @dev initializes a reserve
    * @param _reserve the address of the reserve
    * @param _aTokenAddress the address of the overlying aToken contract
    * @param _decimals the decimals of the reserve currency
    **/
    function initReserve(
        address _reserve,
        address _aTokenAddress,
        uint256 _decimals
    ) external onlyPoolConfigurator {
        reserves[_reserve].init(_aTokenAddress, _decimals);
        addReserveToListInternal(_reserve);

    }


     /**
    * @dev activates a reserve
    * @param _reserve the address of the reserve
    **/
    function activateReserve(address _reserve) external onlyPoolConfigurator {
        CoreLibrary.ReserveData storage reserve = reserves[_reserve];

        require(
            reserve.lastLiquidityCumulativeIndex > 0 &&
                reserve.lastVariableBorrowCumulativeIndex > 0,
            "Reserve has not been initialized yet"
        );
        reserve.isActive = true;
    }

    /**
    * @dev deactivates a reserve
    * @param _reserve the address of the reserve
    **/
    function deactivateReserve(address _reserve) external onlyPoolConfigurator {
        CoreLibrary.ReserveData storage reserve = reserves[_reserve];
        reserve.isActive = false;
    }

    /**
    * @notice allows the configurator to freeze the reserve.
    * A freezed reserve does not allow any action apart from repay, redeem, liquidationCall, rebalance.
    * @param _reserve the address of the reserve
    **/
    function freezeReserve(address _reserve) external onlyPoolConfigurator {
        CoreLibrary.ReserveData storage reserve = reserves[_reserve];
        reserve.isFreezed = true;
    }

    /**
    * @notice allows the configurator to unfreeze the reserve. A unfreezed reserve allows any action to be executed.
    * @param _reserve the address of the reserve
    **/
    function unfreezeReserve(address _reserve) external onlyPoolConfigurator {
        CoreLibrary.ReserveData storage reserve = reserves[_reserve];
        reserve.isFreezed = false;
    }

    /**
    * @dev adds a reserve to the array of the reserves address
    **/
    function addReserveToListInternal(address _reserve) internal {
        bool reserveAlreadyAdded = false;
        for (uint256 i = 0; i < reservesList.length; i++)
            if (reservesList[i] == _reserve) {
                reserveAlreadyAdded = true;
            }
        if (!reserveAlreadyAdded) reservesList.push(_reserve);
    }


}
