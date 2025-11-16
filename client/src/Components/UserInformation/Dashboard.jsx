import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ModalTransactions from "./ModalTransactions";

export default function Dashboard() {
  useEffect(() => {}, []);

  //---------------------------------------tramsactions------------------------------//

  const login = localStorage.getItem("authToken");
  console.log(login);

  const [allTransaction, setallTransaction] = useState([]);
  const getallTransaction = async () => {
    await axios({
      method: "POST",
      url: "https://cryptofolio-backstack-aiwo.onrender.com/wallet/getwalletTransaction",
      data: {
        login: login,
      },
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      console.log("transactions");
      console.log(res.data);

      setallTransaction(res.data.reverse());
    });
  };
  useEffect(() => {
    getallTransaction();
    getamount();
  }, []);

  console.log(allTransaction);

  const [opentransaction, setopentransaction] = useState(false);
  const [datatransaction, setdatatransaction] = useState({});
  console.log(datatransaction);

  //---------------------------------------tramsactions------------------------------//

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const userid = location.state.id;
  console.log(userid);

  const [userdata, setuserdata] = useState({});

  //-------------------------------------wallet------------------------------------------//

  const [bal, setbal] = useState();
  const [inv, setinv] = useState();

  const getamount = async () => {
    await axios({
      method: "POST",
      url: "https://cryptofolio-backstack-aiwo.onrender.com/wallet/getwalletAmount",
      data: {
        login: login,
      },
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      console.log("current balance");

      setbal(
        Math.ceil(`${res.data[0].Amount}`).toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        })
      );
      setinv(
        Math.ceil(`${res.data[0].Invested}`).toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        })
      );
    });
  };
  console.log(bal);
  console.log(inv);

  useEffect(() => {}, []);
  console.log(bal);

  //-------------------------------------wallet-----------------------------------------//

  useEffect(() => {
    const fetchuserdata = async () => {
      const response = await fetch(
        "https://cryptofolio-backstack-aiwo.onrender.com/dashboard/userdetails",
        {
          method: "POST",
          body: JSON.stringify({ UserId: userid }),
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },

          header: "Access-Control-Allow-Origin: *",
        }
      );
      const json = await response.json();

      console.log("response we get from dashboard");
      console.log(json);
      setuserdata(json);
      seturl(json.userProfile[0].url);
    };
    fetchuserdata();
  }, []);

  const [url, seturl] = useState("");

  console.log(userdata);
  console.log(userdata.Data);
  console.log(url);

  const handleupdate = () => {
    navigate("/profileUpdate", { state: { id: userid } });
  };

  return (
    <div className="bg-[#171b26] h-content">
      {opentransaction ? (
        <ModalTransactions
          fun={{ data: datatransaction, open: setopentransaction }}
        />
      ) : (
        <div></div>
      )}

      {userdata.Data && (
        <div className="pt-[100px] pb-[80px] bg-[#1d2230] w-[70%]  mx-auto h-[100%] ">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-[90%] mx-auto  m-5 bg-[#272e41] p-5  rounded-lg ">
              <div
                className="w-[150px] h-[150px] bg-cover m-5 mx-auto border-2"
                style={{ backgroundImage: `url(${url})` }}
              ></div>

              <div className="text-white  m-5 mx-auto">
                <div className="m-2 font-semibold grid grid-cols-1 md:grid-cols-4 ">
                  <div className="mr-3 font-bold">Name </div>
                  <div className="grid grid-cols-3 mx-auto">
                    {userdata.Data.first_name}
                    {userdata.Data.last_name}
                  </div>
                </div>
                <div className="m-2 font-semibold grid grid-cols-1 md:grid-cols-4  ">
                  <div className="mr-3 font-bold">Mobile </div>
                  <div className="grid grid-cols-3 mx-auto">
                    {userdata.Data.mob}
                  </div>
                </div>
                <div className="m-2 font-semibold grid grid-cols-1 lg:grid-cols-4 ">
                  <div className="mr-3 font-bold">Email </div>
                  <div className="text-[12px] sm:text-[13px] md:text-[16px] grid grid-cols-3 ">
                    {userdata.Data.email}
                  </div>
                </div>
                <button
                  className="bg-[#209fe4]  w-[100%] mx-auto 
               p-1 mt-2  rounded-md font-semibold text-[12px] md:text-[15px] mb-4"
                  onClick={handleupdate}
                >
                  update Profile
                </button>
              </div>
            </div>

            <div>
              <div className="w-[90%]  mx-auto bg-[#272e41] p-5  rounded-lg mb-4">
                <div className="font-bold text-white text-center  md:text-left text-[20px] md:text-[22px] mb-2">
                  Wallet
                </div>
                <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 pb-3">
                  <div className="font-semibold  text-[#dedddd] text-center text-[20px] md:text-[22px] mb-2">
                    <div>Balance</div>
                    <div>{bal}</div>
                  </div>
                  <div className="font-semibold w-[80%] mx-auto grid grid-cols-1 text-[#dedddd] text-center text-[20px] md:text-[22px]">
                    <div>Invested</div>
                    <div>{inv}</div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <div>
              <div className="w-[90%]  mx-auto bg-[#272e41] p-5  rounded-lg ">
                <div className="font-bold text-white text-center  md:text-left text-[20px] md:text-[22px] mb-8">
                  Transactions
                </div>
                <div className=" w-[80%] mx-auto max-h-[400px] overflow-y-scroll">
                  {allTransaction.map((value, key) => {
                    return (
                      <div
                        onClick={() => {
                          setopentransaction(true);
                          setdatatransaction(value);
                        }}
                      >
                        <div className="bg-[#171b26] rounded-lg text-white m-3 p-4 md:grid md:grid-cols-3 ">
                          <div className="w-[100%] md:w-[100%]">
                            <div className="font-semibold text-white text-center text-[14px] md:text-[17px] mb-2 ">
                              {value.CoinName}
                            </div>
                            <div className=" w-[50px] h-[50px] mx-auto ">
                              <img src={value.img} alt=""></img>
                            </div>

                            {value.type === "Buy" ? (
                              <div className="text-[#26a69a] font-semibold text-center text-[14px] md:text-[17px] mb-2 mt-2">
                                {value.type}
                              </div>
                            ) : (
                              <div className="text-[#c12f3d] font-semibold  text-center text-[14px] md:text-[17px] mb-2 mt-2">
                                {value.type}
                              </div>
                            )}
                          </div>
                          <div className="hidden md:grid  md:grid-cols-1 lg:grid-cols-2  col-span-2">
                            <div className="">
                              <div className="text-center font-semibold lg:text-[20px] lg:m-2">
                                Quantity
                              </div>
                              <div className="text-center font-bold lg:m-2">
                                {value.Quantity}
                              </div>
                            </div>
                            <div className="">
                              <div className="text-center font-semibold lg:m-2 lg:text-[20px]">
                                Amount
                              </div>
                              <div className="text-center font-bold lg:m-2">
                                ₹{value.Amount}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!userdata.Data && <div>Loading</div>}
    </div>
  );
}
