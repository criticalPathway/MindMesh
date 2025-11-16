import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function UpdateInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const userid = location.state.id;
  console.log(userid);

  const [userdata, setuserdata] = useState({});

  //-------------------------------------image------------------------------------------//

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "crypto_profile");
    data.append("cloud_name", "dcth4owgy");
    await fetch(" https://api.cloudinary.com/v1_1/dcth4owgy/image/upload", {
      // headers: "Access-Control-Allow-Origin: *",
      method: "post",

      body: data,
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        console.log("here is the url");

        setUrl(data.url);
        console.log(url);
        const response = await fetch(
          "https://cryptofolio-backstack-aiwo.onrender.com/dashboard/profileupdate",
          {
            method: "POST",
            body: JSON.stringify({ UserId: userid, ProfileUrl: data.url }),
            mode: "cors",
            headers: {
              "Content-type": "application/json",
            },

            header: "Access-Control-Allow-Origin: *",
          }
        );
        console.log("image url which we are sending");
        console.log(url);
        const json = await response.json();
        console.log("response we get from profileupdate");
        console.log(json);
        navigate("/dashboard", { state: { id: userid } });
      })

      .catch((err) => console.log(err));
  };

  //-------------------------------------image-----------------------------------------//

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
    };
    fetchuserdata();
  }, []);

  console.log(userdata);
  console.log(userdata.Data);
  console.log(userdata.userProfile);
  console.log(url);
  return (
    <div className="bg-[#171b26] h-screen pt-[100px] ">
      <div className="mx-auto mt-[150px] w-[70%] md:w-[50%] bg-[#272e41] rounded-lg p-5 ">
        <div className=" mx-auto">
          <div className="sm:w-[30%] mx-auto font-semibold">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </div>
          <div className="text-center m-5 text-[#090e1e]">
            {image ? (
              <button
                onClick={uploadImage}
                className="bg-[#209fe4] w-[100%] md:w-[30%]
             p-1 mt-6  rounded-md font-semibold text-[12px] md:text-[15px] mb-4"
              >
                Upload
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
