import React from "react";
import Footer from "./Footer";
import List from "./List";
import { Link } from "react-router-dom";
import Typed from "react-typed";
import bg from "../Images/bg3.png";

export default function Home() {
  //   const openmodal= ()=>{

  //      setOpen(true);

  //  }

  return (
    <div>
      <div className=" bg-[#171b26]  h-full md:grid md:grid-cols-2 ">
        <div className="text-white mx-auto text-center md:text-left md:ml-9 md:pl-9 w-[100%]  pt-[150px] sm:pt-[170px] md:pt-[150px] xl:pt-[200px] py-[20%]">
          <div className=" text-[10px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[26px]">
            Invest with Confidence
          </div>
          <div className="flex justify-around md:justify-start">
            <div className="font-bold text-[25px] sm:text-[35px] md:text-[45px] lg:text-[55px] xl:text-[65px] grad_text decoration-transparent">
              Grow With CryptoFolio
            </div>
          </div>
          {/* <div className="flex justify-center">
            <p className='textwhite text-base md:text-xl lg:text-3xl'>we are   </p>
           
                <Typed className='textwhite text-base md:text-xl lg:text-3xl ml-2'
                strings={['Simple','Secure','innovative']}
                typeSpeed={50}
                backSpeed={40}
                loop/>
          </div> */}
          <div className=" text-[10px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[26px]">
            {" "}
            Trade with confidence in the world of crypto
          </div>
          <div className="m-5 grad_bg w-[100px] text-center font-semibold md:w-[150px] lg:w-[180px] text-[#ffffff] text-[10px] sm:text-[10px] md:text-[11px] lg:text-[11px] xl:text-[15px] p-1 rounded-md mx-auto md:ml-1">
            <Link to="/market">Explore the Market</Link>
          </div>
        </div>

        <div className="w-[100px] grad_bg blur-[90px]  top-[130px] right-[270px] h-[250px] animate-ping absolute border-2 rounded-full"></div>

        <div
          className="  z-10 hidden md:inline-flex mx-auto mt-[110px] sm:mt-[90px] sm:mb-[50px]  md:mt-[120px] md:mb-[110px] lg:mt-[150px] lg:mb-[100px] "
          style={{
            width: "500px",

            backgroundImage: `url(${bg})`,
            // backgroundRepeat: " no-repeat",
            // // backgroundSize: "cover",
            // backgroundPosition: "center",
            // backgroundAttachment: "fixed",
            // backgroundize: "contains",
            backgroundRepeat: "no-repeat",
            // backgroundAttachment: "fixed",
            // backgroundSize: "cover",
            backgroundSize: "100% 100%",
          }}
        ></div>
      </div>
      <List />
      {/* <Footer /> */}
    </div>
  );
}
