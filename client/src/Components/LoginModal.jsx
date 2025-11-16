import React from "react";
import { useState } from "react";

export default function LoginModal({ closemod }) {
  const [credentials, setcredentials] = useState({
    first_name: "",
    last_name: "",
    age: "",
    mob: "",
    email: "",
    password: "",
  });
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const [loggedin, setloggedin] = useState(false);

  const eventHandler = async () => {
    const response = await fetch("https://cryptofolio-backstack-aiwo.onrender.com/register/creatuser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        age: credentials.age,
        mob: credentials.mob,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.userexist) {
      alert("user already exist");
    } 
    else {
      if (!json.success) {
        alert("enter correct credentials");
      } else {
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        console.log("done");
        setloggedin(true);
      }
    }
  };

  //--------------------------create wallet----------------//

  //--------------------------create wallet----------------//

  if (loggedin) {
    closemod[0](false);
  } else {
    return (
      <div>
        <div className="w-[100%] fixed top-0 h-full snap-none z-50  bg-[#131722c3]">
          {/* <div className="z-10 w-[250px] h-[150px] mt-[250px] ml-[450px] hidden sm:inline-flex absolute rounded-full bg-[#9f9c9c] blur-lg"></div> */}

          {/* background div*/}

          <div className="text-black bg-white rounded-md border-2 border-white w-[70%] md:w-[50%] mx-auto mt-[40px] md:mt-[200px]">
            <button
              onClick={() => {
                closemod[0](false);
              }}
              className="font-bold ml-5 mt-3"
            >
              X
            </button>
            <div className=" ">
              {/* <div className=" animate-pulse rounded-full bg-[#b3b3b3] blur-lg absolute hidden mt-[20px] ml-[10px] sm:inline-flex w-[300px] h-[200px] z-10"></div> */}
              <div className="">
                <h1 className=" text-center p-1 font-bold text-[18px] sm:text-[25px] z-50 ">
                  Welcome to our Cryptofolio!
                </h1>

                <form className=" grid grid-cols-1 md:grid-cols-2 p-3">
                  <div className=" flex p-2 justify-between m-1 flex-wrap z-50">
                    <label for="first_name" className="font-semibold">
                      First Name
                    </label>
                    <div>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={credentials.first_name}
                        onChange={onchange}
                        className="text-black bg-[#cfcfcf]"
                      />
                    </div>
                  </div>
                  <div className=" flex p-2 justify-between m-1 flex-wrap z-50">
                    <label for="last_name" className="font-semibold">
                      Last Name
                    </label>
                    <div>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={credentials.last_name}
                        onChange={onchange}
                        className="text-black bg-[#cfcfcf]"
                      />
                    </div>
                  </div>
                  <div className=" flex p-2 justify-between m-1 flex-wrap  z-50">
                    <label for="age" className="font-semibold">
                      Age
                    </label>
                    <div>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={credentials.age}
                        onChange={onchange}
                        className="text-black bg-[#cfcfcf]"
                      />
                    </div>
                  </div>
                  <div className="  flex p-2 justify-between m-1 flex-wrap">
                    <label for="mob" className="font-semibold">
                      Mobile number
                    </label>
                    <div>
                      <input
                        type="number"
                        id="mob"
                        name="mob"
                        value={credentials.mob}
                        onChange={onchange}
                        className="text-black bg-[#cfcfcf]"
                      />
                    </div>
                  </div>
                  <div className="  flex p-2 justify-between m-1 flex-wrap">
                    <label for="email" className="font-semibold">
                      Email
                    </label>
                    <div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={onchange}
                        className="text-black bg-[#cfcfcf]"
                      />
                    </div>
                  </div>
                  <div className="  flex p-2 justify-between m-1 flex-wrap">
                    <label for="password" className="font-semibold">
                      Password
                    </label>
                    <div>
                      <input
                        type="text"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={onchange}
                        className="text-black bg-[#cfcfcf] "
                      />
                    </div>
                  </div>
                </form>
                <div className="text-center mx-auto font-semibold">
                  <button
                    onClick={() => {
                      closemod[1](true);
                      closemod[0](false);
                    }}
                  >
                    Already a user...?
                  </button>
                </div>
                <div className="text-center mx-auto font-semibold m-3 bg-[#131722] rounded-md text-white w-[100px] p-1 hover:bg-[#414141]">
                  <button onClick={eventHandler}>login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
