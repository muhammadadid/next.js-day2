import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import CardCategory from "./CardCategory";
const Category = () => {
  const [category, setCategory] = useState([]);
  const scrollRef = useRef();

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk5MDg1NzZ9.ao6_vk2T5Ia3Ez9ezF-T9q0PKOGv7XaIvdh_guEf_os",
          },
        }
      );
      setCategory(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      })
  };
  };

  return (
    <div className="flex-1 flex flex-col items-start justify-start gap-[100px] max-w-full mq800:gap-[50px] mq450:gap-[25px]">
      <div className="self-stretch flex flex-col items-start justify-start gap-[20px] max-w-full">
        <h1 className="m-0 w-[1172px] relative text-inherit font-normal font-inherit inline-block max-w-full mq800:text-32xl mq450:text-19xl">
          Popular Destinations
        </h1>
        <div className="flex flex-col items-start self-stretch justify-start max-w-full text-5xl text-slategray font-rubik">
          <div className="w-[368px] h-[3px] relative box-border max-w-full border-t-[3px] border-solid border-coral-100"></div>
          <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[32px] max-w-full mt-[-3px] mq800:gap-[16px]">
            <div className="flex-1 flex flex-col items-start justify-start pt-8 px-0 pb-0 box-border min-w-[762px] max-w-full mq1125:min-w-full">
              <div className="relative self-stretch mq450:text-lgi">
                Most popular destinations around the world, from historical
                places to natural wonders.
              </div>
            </div>
            <div className="w-[172px] flex flex-row items-start justify-between gap-[20px]">
              <img
                className="self-stretch w-[66px] rounded-xl max-h-full object-contain min-h-[60px]"
                loading="lazy"
                alt=""
                onClick={() => handleScroll("left")}
                src="/images/kiri.png"
              />

              <img
                className="self-stretch w-[66px] rounded-xl max-h-full object-contain min-h-[60px]"
                loading="lazy"
                alt=""
                onClick={() => handleScroll("right")}
                src="/images/kanan.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div 
      ref={scrollRef}
      className=" overflow-x-scroll no-scrollbar flex flex-row items-start justify-start pl-24 py-0 px-0 box-border gap-[32px] max-w-full  text-9xl text-white mq800:gap-[16px]">
        {category.map((item) => (
          <CardCategory key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Category;
