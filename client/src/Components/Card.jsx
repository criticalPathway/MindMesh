import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Card() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=true";
  const [info, setinfo] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setinfo(response.data);
    });
  }, []);
  // console.log(open2[0])
  // console.log(open2[1])
  console.log(info);

  if (info.length === 0) {
    return <div>loading</div>;
  } else {
    return (
      <div className="bg-[#1d2230]   mx-auto  text-white p-7">
        <div className="grid grid-cols-1 sm:grid-cols-2  ">
          <div className="font-bold text-[20px] text-center mx-auto sm:text-left xl:text-[29px] w-[80%] text-white p-4">
            Explore top Crypto's Like Bitcoin Ethereum and Dogecoin
            <p className=" text-[#c0c0c0]  pt-5 hidden sm:inline-flex font-normal text-[15px] mx-auto  sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-[15px]">
              buying and selling cryptocurrencies on a cryptocurrency exchange
              or trading platform in order to make a profit from the price
              fluctuations of cryptocurrencies.
            </p>
            <p className=" text-[#d2d1d1]  pt-5 hidden sm:inline-flex font-normal text-[15px] mx-auto  sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-[15px]">
              It's important to keep in mind that crypto trading requires
              discipline and a long-term strategy, as well as the ability to
              manage risk effectively. It's also recommended to start with a
              small investment and gradually increase your exposure as you gain
              experience and knowledge.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
            {info.map((value, key) => {
              if (key < 6) {
                return (
                  <div>
                    <Link
                      to={{
                        pathname: "/coin",
                        hash: `${value.name}`,
                      }}
                      state={{ value }}
                    >
                      <div className="rounded-md shadow-md p-5 shadow-[#00000066]  m-3 w-[180px] border-t-2 border-[#0000001c]">
                        <div className=" mx-auto w-[100px] h-[100px] ">
                          <img src={value.image} alt=""></img>
                        </div>
                        <div className="p-1 text-center font-medium">
                          <h3>Name- {value.name}</h3>
                          <p>Value- {value.current_price}</p>
                          <h3>Up- {value.high_24h}</h3>
                          <h3>Down- {value.low_24h}</h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}
