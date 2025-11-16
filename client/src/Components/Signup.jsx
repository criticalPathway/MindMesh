import React from "react";
import { useState } from "react";

export default function Signup({ closemod }) {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [loggedin, setloggedin] = useState(false);

  const eventHandler = async () => {
    const body = {
      email: credentials.email,
      password: credentials.password,
    };
    const response = await fetch("https://cryptofolio-backstack-aiwo.onrender.com/register/Signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    //  const json=response.json();
    const data = await response.text();
    //  console.log(data);
    if (data == "No such user found") {
      alert("No such user found");
    } else {
      closemod[1](false);

      const leyy = JSON.parse(data);
      console.log(leyy);
      localStorage.setItem("authToken", leyy.authToken);
      console.log(localStorage.getItem("authToken"));
    }

    //  console.log(json);

    //  if(!json.success){
    //   console.log("hi");
    //      alert("enter  credentials");
    //  }
  };

  return (
    <div>
      <div className="z-50 w-[100%] fixed top-0 h-full snap-none  bg-[#131722c3]">
        <div className="text-black bg-white rounded-md border-2 border-white w-[70%] md:w-[50%] mx-auto mt-[150px] md:mt-[200px]">
          <button
            onClick={() => {
              closemod[1](false);
            }}
            className="font-bold ml-5 mt-3"
          >
            X
          </button>

          <h1 className=" text-center p-1 font-bold text-[18px] sm:text-[25px] z-50 ">
            Welcome to our Cryptofolio!
          </h1>

          <div></div>
          <form className=" grid grid-cols-1 md:grid-cols-2 p-3">
            <div className=" flex p-2 justify-between m-1 flex-wrap z-50">
              <label for="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onchange}
                className="text-black bg-[#cfcfcf]"
              />
            </div>
            <div className=" flex p-2 justify-between m-1 flex-wrap z-50">
              <label for="password" className="font-semibold">
                Password
              </label>
              <input
                type="number"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onchange}
                className="text-black bg-[#cfcfcf]"
              />
            </div>
          </form>

          <div className="text-center mx-auto font-semibold">
            <button
              onClick={() => {
                closemod[0](true);
                closemod[1](false);
              }}
            >
              Don't have an account...?
            </button>
          </div>
          <div className="text-center mx-auto font-semibold m-3 bg-[#131722] rounded-md text-white w-[100px] p-1 hover:bg-[#414141]">
            <button onClick={eventHandler}>signup</button>
          </div>
        </div>
      </div>
    </div>
  );
}
