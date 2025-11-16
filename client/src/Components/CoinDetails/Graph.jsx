import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Nav from "../Nav";
import { useLocation, useParams } from "react-router-dom";
import { useRef } from "react";
import CoinInfo from "./CoinInfo";


let tvScriptLoadingPromise;

export default function Details({ open }) {
  const { state } = useLocation();
  console.log(state);
  //-------------------------------------chart---------------------------------------

  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_17e74") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "BITSTAMP:" + `${state.value.symbol}` + "USD",
          interval: "D",
          timezone: "Asia/Kolkata",
          theme: "dark",
          style: "1",
          locale: "in",
          toolbar_bg: "#f1f3f6",
          enable_publishing: true,
          hide_legend: true,
          withdateranges: true,
          save_image: true,
          details: true,
          calendar: false,
          container_id: "tradingview_17e74",
        });
      }
    }
  }, []);

  //-------------------------------------chart---------------------------------------

  useEffect(() => {
    // console.log(state);
  }, [state]);
  // const {coin}=location.state;


  

  return (
    <div className=" h-content p-5 min-h-screen w-[100%] pt-14 bg-[#171b26]">
      
      <div className="w-[300px] grad_bg blur-[220px]  right-[90px] h-[300px] absolute border-2 rounded-full"></div>


      <div className="tradingview-widget-container ">
        <div
          id="tradingview_17e74"
          className=" h-[500px] w-[90%] mx-auto pt-10"
          />
      </div>
      <CoinInfo state={state} open={ open }/>
          
    </div>
  );
}
