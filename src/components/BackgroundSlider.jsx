import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useRef } from "react";

const BackgroundSlider = () => {
  const [backgrounds, setBackgrounds] = useState([]);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const fetchBackgrounds = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
          {
            headers: {
              "content-type": "multipart/form-data",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setBackgrounds(response.data.data);
      } catch (error) {
        setError("Error fetching background images");
        console.error("Error fetching background images", error);
      }
    };

    fetchBackgrounds();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current + 1) % backgrounds.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [backgrounds, current]);
  
  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.classList.add("fade");
      const timer = setTimeout(() => {
        backgroundRef.current.classList.remove("fade");
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [current]);
  
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (backgrounds.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="self-stretch h-[1010px] relative max-w-full text-[84px] text-white mq1350:h-auto mq1350:min-h-[1010]">
      <div
        className="flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-[270px] box-border gap-[142px]  bg-cover bg-no-repeat bg-[top] max-w-full mq800:gap-[71px] mq800:pb-[114px] mq800:box-border mq450:gap-[35px] mq1350:pb-[175px] mq1350:box-border"
        style={{ backgroundImage: `url(${backgrounds[current].imageUrl})` }}
      > 
      <header className="self-stretch flex flex-row items-end justify-between p-8 box-border gap-[20px] max-w-full z-[2] text-left text-xl text-white font-rubik">
           <Navbar />
          </header>
          <div className="self-stretch flex flex-col items-start justify-start relative gap-[49px] max-w-full mq800:gap-[24px]">
            <div className="box-border flex flex-row items-start self-stretch justify-start max-w-full py-0 pl-8 pr-0">
              <div className="flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-[121px] box-border gap-[16px] max-w-full mq450:pb-[79px] mq450:box-border">
                <h1 className="m-0 self-stretch relative text-inherit font-normal font-inherit mq800:text-[42px] mq450:text-[25px]">
                  <p className="m-0">Start your unforgettable</p>
                  <p className="m-0">journey with us.</p>
                </h1>
                <div className="relative flex flex-row items-start self-stretch justify-start max-w-full text-5xl font-rubik">
                  <div className="relative flex-1 inline-block max-w-full mq450:text-lgi">
                    The best travel for your jouney begins now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
export default BackgroundSlider;
