import { useState } from "react";
import { loginUser } from "../Redux/slice/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../Redux/slice/userSlice";

const Login = () => { 
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status, token } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    if (token) {
      dispatch(fetchUserDetails(token)).then((action) => {
        const user = action.payload;
        if (user.role === "admin") {
          router.push("/dashboard/ListUser");
        } else {
          router.push("/");
        }
      });
    }
  }, [token, router, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <div className="w-full relative bg-gray-100 overflow-hidden flex flex-col items-end justify-start py-0 pr-[451px] pl-0 box-border leading-[normal] tracking-[normal] text-left text-xl text-black font-poppins mq450:pr-5 mq450:box-border mq900:pr-[225px] mq900:box-border">
      <section className="self-stretch h-[900px] flex flex-row items-start justify-start max-w-full text-left text-xl text-darkblue font-poppins">
        <div className="self-stretch w-[732px] bg-burlywood flex flex-row items-start justify-start py-[31px] px-[42px] box-border relative max-w-full">
          <div className="h-[1141px] w-[731px] relative bg-burlywood hidden max-w-full z-[0]"></div>
          <Image
            className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover z-[1]"
            width={731}
            height={900}
            src="/images/background.png"
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
      <form className="w-[539px] h-[741px] relative z-10 mq450:w-full" onSubmit={handleSubmit}>
        <div className=" w-[539px] shadow-[0px_4px_35px_rgba(0,_0,_0,_0.08)] rounded-21xl bg-white flex flex-col items-start justify-start pt-[52px] pb-[51px] pr-[34px] pl-11 box-border gap-[32.5px] max-w-full z-[2] mt-[-821px] mq450:w-full">
          <div className="w-[539px] h-[741px] relative shadow-[0px_4px_35px_rgba(0,_0,_0,_0.08)] rounded-21xl bg-white hidden max-w-full"></div>
          <div className="self-stretch flex flex-row items-start justify-between gap-[20px] text-xl mq450:flex-wrap">
            <div className="w-[196px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
              <div className="flex flex-col items-start self-stretch justify-start">
                <a className="[text-decoration:none] relative text-[inherit] z-[1] mq450:text-base">
                  Welcome to Infinity Travel
                </a>
                <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-2.5 text-[55px]">
                  <h1 className="m-0 relative text-inherit font-medium font-inherit z-[3] mq450:text-[33px] mq750:text-[44px]">
                    Sign in
                  </h1>
                </div>
              </div>
            </div>
            <div className="w-[124px] relative text-base inline-block shrink-0 z-[1] text-gray-200">
              <p className="m-0">No Account ?</p>
              <a href="/Register" className="m-0 no-underline text-yellowgreen-200">Sign up</a>
            </div>
          </div>
          <div className="w-[451px] flex flex-col items-start justify-start gap-[38px] max-w-full mq450:gap-[19px]">
            <div className="self-stretch h-[92px] flex flex-col items-start justify-start pt-[35px] px-0 pb-0 box-border relative gap-[13px] z-[1]">
              <div className="mt-[-37px] relative shrink-0">
                Enter your email address
              </div>
              <input
                className="[outline:none] bg-white self-stretch h-[57px] relative rounded-4xs box-border min-w-[250px] shrink-0 border-[1px] border-solid "
                type="email"
                name="email"
                placeholder="Email address"
               
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[15px] max-w-full">
              <div className="self-stretch h-[92px] relative max-w-full">
                <div className="absolute top-[0px] left-[0px] w-full h-full flex flex-col items-start justify-start pt-[54px] px-0 pb-[19px] box-border gap-[32px] max-w-full z-[1] mq450:gap-[16px]">
                  <div className="mt-[-56px] relative">Enter your Password</div>
                  <input
                    className="[outline:none] bg-white w-full h-[57px] absolute !m-[0] right-[0px] bottom-[0px] left-[0px] rounded-4xs box-border border-[1px] border-solid border-darkgray-100"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Image
                  className="absolute top-[54px] left-[405px] w-[22px] h-[19px] overflow-hidden z-[3]"
                  loading="lazy"
                  alt=""
                  src="/images/eye.png"
                  width={22}
                  height={19}
                  onClick={handleShowPassword}
                />
              </div>
              <div className="self-stretch flex flex-row items-start justify-end text-[13px] text-maroon">
                <div className="relative inline-block min-w-[108px] z-[1]">
                  Forgot Password
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit" disabled={status === "loading"}
            className="cursor-pointer [border:none] py-[15px] pr-5 pl-[21px] bg-khaki-100 w-[451px] shadow-[0px_4px_19px_rgba(119,_147,_65,_0.3)] rounded-3xs flex flex-row items-start justify-center box-border whitespace-nowrap max-w-full z-[1] hover:bg-khaki-200"
          >
            <div className="h-[54px] w-[451px] relative shadow-[0px_4px_19px_rgba(119,_147,_65,_0.3)] rounded-3xs bg-khaki-100 hidden max-w-full"></div>
            <div className="relative text-base font-medium font-poppins text-gray-400 text-left inline-block min-w-[56px] z-[1]">
              {status === "loading" ? "Loading..." : "Sign in"}
            </div>
          </button>
          <div className="flex flex-row items-start self-stretch justify-center py-0 pl-3 pr-0 text-darkgray-200">
            <div className="relative inline-block min-w-[23px] z-[3]">OR</div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-2.5 box-border max-w-full">
            <div className="flex-1 flex flex-row flex-wrap items-end justify-center gap-[20px] max-w-full">
              <button className="cursor-pointer [border:none] pt-[15px] px-8 pb-3.5 bg-khaki-400 flex-1 rounded-4xs flex flex-row items-start justify-start box-border gap-[21px] min-w-[179px] whitespace-nowrap z-[3] hover:bg-khaki-300">
                <div className="h-[55px] w-[298px] relative rounded-4xs bg-khaki-400 hidden"></div>
                <Image
                  className="h-[26px] w-[26px] relative overflow-hidden shrink-0 min-h-[26px] z-[1]"
                  alt="Google"
                  src="/images/google.png"
                  width={26}
                  height={26}
                />

                <div className="relative text-base font-poppins text-gray-400 text-left z-[1]">
                  Sign in with Google
                </div>
              </button>
              <div className="flex flex-row items-start justify-start gap-[13px]">
                <div className="flex flex-col items-start justify-start px-0 pt-px pb-0">
                  <div className="bg-slate-200 w-[50px] h-[55px] rounded-xl">
                    <Image
                      className="flex items-center justify-center pt-3.5 pl-3"
                      loading="lazy"
                      alt=""
                      src="/images/fb.png"
                      width={26}
                      height={26}
                    ></Image>
                  </div>
                </div>
                <div className="bg-slate-200 w-[50px] h-[55px] rounded-xl">
                  <img
                    className="flex items-center justify-center pt-3.5 pl-3"
                    loading="lazy"
                    alt=""
                    src="/images/apple.png"
                    width={26}
                    height={26}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
