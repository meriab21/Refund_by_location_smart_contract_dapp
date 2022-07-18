import { useState } from 'react';
import { ethers } from 'ethers';
import RefundByLocation from './artifacts/contracts/RefundByLocation.sol/RefundByLocation.json';
import './App.css';
import { Button, Table } from "react-bootstrap";

function App() {
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [employees, setEmployees] = useState([]);
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const connectWallet = async () => {
      try {
          const { ethereum } = window;

          if (!ethereum) {
              alert("Please install MetaMask!");
              return;
          }

          const accounts = await ethereum.request({
              method: "eth_requestAccounts",
          });

          console.log("Connected", accounts[0]);
      } catch (error) {
          console.log(error);
      }
  };

  const fetchEmployees = async () => {
      const { ethereum } = window;

      if (!ethereum) {
          alert("Please install MetaMask!");
          return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
          contractAddress,
          RefundByLocation.abi,
          provider
      );

      const employees = await contract.getEmployees();

      setEmployees(employees);
  };

  const fetchBalance = async () => {
      const { ethereum } = window;

      if (!ethereum) {
          alert("Please install MetaMask!");
          return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
          contractAddress,
          RefundByLocation.abi,
          provider
      );

      const availableBalance = await contract.maxBalance();

      setBalance(ethers.utils.formatUnits(availableBalance, "ether"));
  };

  const addEmployee = async () => {
      const { ethereum } = window;

      if (!ethereum) {
          alert("Please install MetaMask!");
          return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
          contractAddress,
          RefundByLocation.abi,
          signer
      );

      const employee = await contract.addEmployee(employeeAddress);
      await employee.wait();
  };

  const depositBalance = async () => {
      const { ethereum } = window;

      if (!ethereum) {
          alert("Please install MetaMask!");
          return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
          contractAddress,
          RefundByLocation.abi,
          signer
      );

      const transaction = await contract.deposit({
          value: ethers.utils.parseEther("500"),
      });
      await transaction.wait();
  };

  const logAddress = async () => {
      const { ethereum } = window;

      if (!ethereum) {
          alert("Please install MetaMask!");
          return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
          contractAddress,
          RefundByLocation.abi,
          signer
      );

      const FACTOR = 1000000;
      navigator.geolocation.getCurrentPosition(async (position) => {
          const p = position.coords;

          const employee = await contract.reportLocation(
              p.latitude.toString().replace(".", ""),
              p.longitude.toString().replace(".", "")
          );
          await employee.wait();
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h2>
          Refund By Location Smart Contract
        </h2>
      </header>
      <div className="card-list">
        <div className="card-container">
                <Button variant="danger" onClick={connectWallet}>
                    Connect Wallet
                </Button>
        </div>
        <div className="card-container">
              <Button variant="danger" onClick={fetchEmployees}>
                  Get Employees
              </Button>
        </div>

        <div className='card-container'>
            <input
                value={employeeAddress}
                onChange={(e) => setEmployeeAddress(e.target.value)}
            ></input>

            <Button variant="danger" onClick={addEmployee}>
                Add
            </Button>
        </div>

            <div className='card-container'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Employee Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((address) => (
                            <tr key={address}>
                                <td>1</td>
                                <td>{address}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Button variant="danger" onClick={logAddress}>
                    Log address
                </Button>
            </div>
            <div className='card-container'>
              <div className="balance">
                  <Button variant="danger" onClick={fetchBalance}>
                      Get Balance
                  </Button>

                  <Button variant="danger" onClick={depositBalance}>
                      Deposit
                  </Button>
              </div>
              <p>Current Balance: {balance} ETH</p>
          </div>
           
        </div>
     </div>   
 
  );
}

export default App;
