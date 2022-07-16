// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract RefundByLocation {
//    enum StateType { Created, Completed, OutOfCompliance }
    struct Coordinate {
        uint256 lat;
        uint256 long;
    }
//    StateType public State;
    address public Owner;
    uint256 public Radius;
    Coordinate public OfficeLocation;
    int private LastLocationUpdateTimestamp;
    struct EmployeeLocationInfo {
        mapping (uint256 => Coordinate) LocationAtTimeStamp;
    }
    mapping (address => EmployeeLocationInfo) EmployeeLocationInfos;
    // function() public payable {}
    constructor(address owner,uint256 officeLocationLat, uint256 officeLocationLong ,uint256 radius) {
        Owner = owner;
        OfficeLocation = Coordinate({lat: officeLocationLat, long: officeLocationLong });
        Radius = radius;
    }
    function getEmployeeLocationInfor(address employeeAdd, uint256 timeStamp) public view {
        EmployeeLocationInfo storage employeeLocation = EmployeeLocationInfos[employeeAdd];
        console.log("over here lat", employeeLocation.LocationAtTimeStamp[timeStamp].lat);
        console.log("over here long", employeeLocation.LocationAtTimeStamp[timeStamp].long);
        // return employeeLocation[timeStamp];
    }
    // check if the location of the employee is in range
    function isUserLocationInRange(Coordinate memory employeeLocation) private {}
    // report the location of the employee
    function reportLocation(uint256 employeeLocationCoordinateLat, uint256 employeeLocationCoordinateLong , uint256 timeStamp) public {
        EmployeeLocationInfo storage employeeLocationInfo = EmployeeLocationInfos[msg.sender];
        employeeLocationInfo.LocationAtTimeStamp[timeStamp] = Coordinate({lat: employeeLocationCoordinateLat, long: employeeLocationCoordinateLong });
        // EmployeeLocationInfos[msg.sender] = employeeLocationInfo;
    }
}