import React,{useContext, useEffect} from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import {gsap} from "gsap";


import { TransactionContext } from "../context/TransactionContext";
import brand from "../../images/brand.png";
import { Loader } from "./";


const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism"
    />
  );
};

const Welcome = () => {

// These are all for animations
  useEffect(() => {
    const card = document.querySelector(".eth-card");
    const hero = document.querySelector(".hero");
    const form = document.querySelector(".blue-glassmorphism")
  
    gsap.to(card, {
      scale: 1, // Set the final scale value
      duration: 1,
      delay: 0.5
    });

    gsap.to(hero,{
      scale:1,
      duration:0.5,
    })

    gsap.to(form,{
      scale:1,
      delay:1,
      duration:0.5,
    })

  }, []);
  // animation code Till here

  const {connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading} = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const {addressTo, amount, keyword, message} = formData;
    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return alert("All fields must be filled.") ;
    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4 py-12">
        {/* This is the left part of the homepage i.e Hero Section */}
        <div className="hero flex flex-1 justify-start flex-col mf:mr-10 scale-0">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crpyto <br /> Across World
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world, Buy & Sell cryptocurrencies easily on
            N-Krypt
          </p>
          {!currentAccount && (<button
            type="submit"
            onClick={connectWallet}
            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 cursor-pointer hover:bg-[#2546bd] rounded-full "
          >
            <p className="text-white text-base font-semibold">Connect Wallet</p>
          </button>)}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={`sm:rounded-none rounded-tr-2xl ${commonStyles}`}>
              Security
            </div>
            <div className={`rounded-none sm:rounded-tr-2xl ${commonStyles}`}>
              Ethereum
            </div>
            <div className={`rounded-none sm:rounded-bl-2xl ${commonStyles}`}>
              Web 3.O
            </div>
            <div className={`sm:rounded-none rounded-bl-2xl  ${commonStyles}`}>
              Low Fees
            </div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>

        {/* This is the right part of the homepage i.e card and the form */}
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 scale-0 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#2952e3" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">{`${currentAccount.slice(0,5)}...${currentAccount.slice(currentAccount.length-4)}`}</p>
                <p className="text-white flex items-center justify-between font-semibold text-lg mt-1">
                  Ethereum{" "}
                  <span>
                    <img className="h-10 w-10" src={brand} alt="logo" />
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* form */}
          <div className="p-5 scale-0 sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (Eth)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                onClick={handleSubmit}
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
