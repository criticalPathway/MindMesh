import React, { useEffect, useState } from "react";

export default function ModalTransactions({ fun }) {
  console.log(fun.data);

  return (
    <div className="w-[100%] fixed top-0 h-full snap-none z-50  bg-[#131722c3]">
      <button
        className="text-[50px] m-9 text-white"
        onClick={() => {
          fun.open(false);
        }}
      >
        x
      </button>

      <div className="border-2 w-[60%] mx-auto text-black bg-white rounded-lg p-1  md:mt-[100px]">
        <h1 className=" text-center p-1 font-bold text-[18px] sm:text-[25px] z-50 ">
          Your Transaction details
        </h1>
        <div></div>
        <div className=" grid grid-cols-1 md:grid-cols-2 p-3">
          <div className="">
            <div className="font-semibold text-black text-center text-[17px] md:text-[17px] mb-2 ">
              {fun.data.CoinName}
            </div>
            <div className=" w-[70px] h-[70px] mx-auto ">
              <img src={fun.data.img} alt=""></img>
            </div>
            {fun.data.type === "Buy" ? (
              <div className="text-[#26a69a] font-bold text-center text-[14px] md:text-[17px] mb-2 mt-2">
                {fun.data.type}
              </div>
            ) : (
              <div className="text-[#c12f3d] font-bold  text-center text-[14px] md:text-[17px] mb-2 mt-2">
                {fun.data.type}
              </div>
            )}
          </div>
          <div className="mt-7">
            <div className="flex justify-between font-semibold text-black text-center text-[17px] md:text-[17px] mb-2">
              <div>Amount: </div>
              <div>₹ {fun.data.Amount}</div>
            </div>
            <div className="flex justify-between font-semibold text-black text-center text-[17px] md:text-[17px] mb-2">
              <div>Prise: </div>
              <div>₹ {fun.data.Prise}</div>
            </div>
            <div className="flex flex-col justify-start font-semibold md:grid grid-cols-2 text-black text-center text-[17px] md:text-[17px] mb-2">
              <div className="text-left">Quantity: </div>
              <div className="text-left md:text-right">{fun.data.Quantity}</div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
