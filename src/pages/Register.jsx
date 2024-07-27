import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Image from "next/image";
import { setToken } from "../Redux/slice/authSlice";


const Register = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    role: "member",
    password: "",
    passwordRepeat: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      profilePictureUrl: imageUrl,
    };

    if (formData.password !== formData.passwordRepeat) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      console.log("payload:", payload);
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
          },
        }
      );
      console.log("register response:", response);
      const token = response.data.data.token;
      
      toast.success(response.data.message);
      router.push("/Login");
      
    } catch (error) {
      console.log(error.response);
      toast.error("Error Registering");
    }
  };

  const handleUpload = async (e) => {
    const fileUrl = e.target.files[0];
    const data = new FormData();
    data.append("image", fileUrl);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    };

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        data,
        config
      );
      console.log(res);
      setImageUrl(res.data.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error uploading image");
    }
  };
  

  return (
    <div className="w-full relative bg-gray-100 overflow-hidden flex flex-col items-end justify-start py-0 pr-[451px] pl-0 box-border leading-[normal] tracking-[normal] text-left text-xl text-black font-poppins mq450:pr-5 mq450:box-border mq900:pr-[225px] mq900:box-border">
      <section className="self-stretch h-[1141px] flex flex-row items-start justify-start max-w-full text-left text-xl text-darkblue font-poppins">
        <div className="self-stretch w-[732px] bg-burlywood flex flex-row items-start justify-start py-[31px] px-[42px] box-border relative max-w-full">
          <div className="h-[1141px] w-[731px] relative bg-burlywood hidden max-w-full z-[0]"></div>
          <img
            className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover z-[1]"
            alt=""
            src="/images/backgroundRegister.png"
            width={732}
            height={1141}
          />
          <Image
            className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[100px] z-[2] mq450:text-base"
            src="/images/logo.png"
            alt="Your Logo"
            width={75}
            height={75}
          ></Image>
        </div>
      </section>
      <div className="w-[539px] shadow-[0px_4px_35px_rgba(0,_0,_0,_0.08)] rounded-21xl bg-white flex flex-col items-start justify-start pt-[29px] px-11 pb-[41.8px] box-border gap-[32.1px] max-w-full z-[2] mt-[-1111px] mq450:pb-5 mq450:box-border mq700:gap-[16px] mq700:pl-[22px] mq700:pr-[22px] mq700:box-border mq900:pb-[27px] mq900:box-border">
        <div className="w-[539px] h-[892px] relative shadow-[0px_4px_35px_rgba(0,_0,_0,_0.08)] rounded-21xl bg-white hidden max-w-full"></div>
        <div className="flex flex-col items-start self-stretch justify-start max-w-full">
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[17px] box-border max-w-full">
            <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap">
              <a className="[text-decoration:none] relative text-[inherit] z-[3] mq450:text-base">
                Welcome to Infinity Travel
              </a>
              <div className="w-[124px] relative text-base inline-block shrink-0 z-[1] text-gray-200">
                <p className="m-0">Have an account ?</p>
                <a
                  href="/Login"
                  className="m-0 no-underline text-yellowgreen-200"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
          <h1 className="m-0 w-[272px] relative text-[55px] font-medium font-inherit inline-block whitespace-nowrap z-[1] mt-[-10.4px] mq450:text-[33px] mq900:text-[44px]">
            Sign up
          </h1>
        </div>
        <form className="m-0 self-stretch flex flex-col items-start justify-start gap-[21.5px] max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-[13.5px] max-w-full">
            <div className="self-stretch h-[117.2px] flex flex-col items-start justify-start pt-[44.6px] px-0 pb-0 box-border relative gap-[23.1px] z-[1]">
              <div className="mt-[-47.1px] relative text-base font-poppins text-black text-left shrink-0">
                Enter your email address
              </div>
              <input
                className="[outline:none] bg-white self-stretch h-[57px] relative rounded-4xs box-border min-w-[250px] shrink-0 border-[1px] border-solid"
                type="email"
                placeholder="Enter your email address"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="w-[410px] flex flex-row items-start justify-start py-0 px-1 box-border max-w-full">
              <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap">
                <div className="h-[109.6px] w-[167px] flex flex-col items-start justify-start relative z-[1]">
                  <div className="w-[216px] absolute !m-[0] top-[0px] right-[-49px] text-base font-poppins text-black text-left inline-block">
                    User name
                  </div>
                  <input
                    className="[outline:none] bg-white w-[216px] h-[57px] absolute !m-[0] right-[-49px] bottom-[0.1px] rounded-4xs box-border border-[1px] border-solid border-darkgray"
                    type="text"
                    placeholder="Enter your user name"
                    name="name"
                    onChange={handleChange}
                  />
                </div>
                <div className="h-[109.6px] w-[167px] flex flex-col items-start justify-start relative z-[1]">
                  <div className="w-[216px] absolute !m-[0] top-[0px] right-[-49px] text-base font-poppins text-black text-left inline-block">
                    Contact Number
                  </div>
                  <input
                    className="[outline:none] bg-white w-[216px] h-[57px] absolute !m-[0] right-[-49px] bottom-[0.1px] rounded-4xs box-border border-[1px] border-solid border-darkgray"
                    type="tel"
                    name="phoneNumber"
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                  />
                </div>
              </div>
            </div>
            <div className="self-stretch h-[117.2px] flex flex-col items-start justify-start pt-[44.6px] px-0 pb-0 box-border relative gap-[23.2px] z-[1]">
              <div className="mt-[-47.2px] relative text-base font-poppins text-black text-left shrink-0">
                Enter your Password
              </div>
              <input
                className="[outline:none] bg-white self-stretch h-[57px] relative rounded-4xs box-border min-w-[250px] shrink-0 border-[1px] border-solid"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <div className="self-stretch h-[117.2px] flex flex-col items-start justify-start pt-[44.6px] px-0 pb-0 box-border relative gap-[23.2px] z-[1]">
              <div className="mt-[-47.2px] relative text-base font-poppins text-black text-left shrink-0">
                Repeat Password
              </div>
              <input
                className="[outline:none] bg-white self-stretch h-[57px] relative rounded-4xs box-border min-w-[250px] shrink-0 border-[1px] border-solid border-darkgray"
                type="password"
                name="passwordRepeat"
                onChange={handleChange}
                placeholder="Repeat your password"
              />
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 px-0.5 box-border max-w-full">
            <div className="flex-1 flex flex-row flex-wrap items-start justify-start gap-[18px] max-w-full">
              <div className="relative inline-block">
                <select
                  onChange={handleChange}
                  name="role"
                  className="appearance-none bg-khaki-300 rounded-full text-dark px-4 py-2 pr-8 font-poppins text-base cursor-pointer w-[213px] h-[40px]"
                >
                  <option>User</option>
                  <option>admin</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-dark">
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
              <div className="relative inline-block cursor-pointer">
                <input
                  type="file"
                  name=""
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Upload"
                  onChange={handleUpload}
                />
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-khaki-300 text-dark">
                  <img
                    src="/images/apa.png"
                    alt="Upload Icon"
                    className="w-6 h-6"
                    loading="lazy"
                  />
                  <span className="text-base font-poppins">
                    Click to upload
                  </span>
                </div>
              </div>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded Image"
                  className="w-20 h-20 rounded-full"
                />
              )}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="cursor-pointer [border:none] py-[15px] pr-5 pl-[21px] bg-khaki-100 w-[451px] shadow-[0px_4px_19px_rgba(119,_147,_65,_0.3)] rounded-3xs flex flex-row items-start justify-center box-border whitespace-nowrap max-w-full z-[1] hover:bg-khaki-200"
          >
            <div className="h-[54px] w-[451px] relative shadow-[0px_4px_19px_rgba(119,_147,_65,_0.3)] rounded-3xs bg-khaki-100 hidden max-w-full"></div>
            <div className="relative text-base font-medium font-poppins text-gray-400 text-left inline-block min-w-[56px] z-[1]">
              Sign Up
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
