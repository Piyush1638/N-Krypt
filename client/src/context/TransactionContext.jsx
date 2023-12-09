import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount , setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async ()=>{
    try {
      if(!ethereum) return alert("Please install metamask.");
      const transactionContract = getEthereumContract();
      const availableTransactions = await transactionContract.getAllTransactions();
      // console.log(availableTransactions);
      const structuredAvailableTransactions = availableTransactions.map((transaction)=>({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        keyword: transaction.keyword,
        message: transaction.message,
        amount: parseInt(transaction.amount._hex)/(10 ** 18),
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
      }))
      //  console.log(structuredAvailableTransactions);
      setTransactions(structuredAvailableTransactions);
    } catch (error) {
      // alert(error.message);
    }
  }


  // This is to check whether the metamask is installed or not

  const checkIfWalletIsConnected = async () => {
    try {
      // if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        alert("No Accounts Detected OR Found.");
      }
      // console.log(accounts);
    } catch (error) {
      // alert(error.message);
      throw new Error("No ethereum object.");
    }
  };

  //   This function will connect the wallet to the app
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      // console.log(accounts);
    } catch (error) {
      // alert(error.message);
      throw new Error("No ehtereum object.");
    }
  };

  // check if transactions exists or not 
  const checkIfTransactionsExist = async ()=>{
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      // alert(error.message);
      throw new Error("No ethereum object.");
    }
  }

  // This function is use to send transaction
  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      // get the data from the forms
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount =  ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", //Gwei,
            value: parsedAmount._hex, // converting the parsed amount into hexadecimal
        }]
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount,message,keyword);
      setIsLoading(true);
      // console.log(`Loading: ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      // console.log(`Success: ${transactionHash.hash}`);
      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
      window.location.reload(true);

    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
