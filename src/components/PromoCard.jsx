import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import FormPromo from "./FormPromo";

const Promo = () => {
  const [promo, setPromo] = useState([]);
  const scrollRef = useRef(null);

  const getPromo = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
        {
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk5MDg1NzZ9.ao6_vk2T5Ia3Ez9ezF-T9q0PKOGv7XaIvdh_guEf_os",
          },
        }
      );
      setPromo(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    getPromo();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col items-start justify-start gap-[100px] max-w-full mq800:gap-[50px] mq450:gap-[25px]">
      <div className="flex flex-col items-start self-stretch justify-start max-w-full">
        <div className="self-stretch flex flex-row items-end justify-between max-w-full gap-[20px] mq800:flex-wrap">
          <div className="w-[172px] flex flex-row items-start justify-start gap-[40px]">
            <img
              className="self-stretch w-[66px] rounded-xl max-h-full overflow-hidden shrink-0 object-contain min-h-[60px]"
              loading="lazy"
              alt=""
              onClick={() => scroll("left")}
              src="/images/kiri.png"
            />
            <img
              className="self-stretch w-[66px] rounded-xl max-h-full overflow-hidden shrink-0 object-contain min-h-[60px]"
              loading="lazy"
              alt=""
              onClick={() => scroll("right")}
              src="/images/kanan.png"
            />
          </div>
          <div className="w-[460px] flex flex-col items-end justify-end gap-[29px] max-w-full">
            <div className="flex flex-row items-start self-stretch justify-end max-w-full">
              <div className="w-[369px] flex flex-col items-end justify-end gap-[20px] max-w-full">
                <h1 className="relative m-0 font-normal text-inherit font-inherit mq800:text-32xl mq450:text-19xl">
                  Special Offer
                </h1>
                <div className="flex flex-row items-start self-stretch justify-end">
                  <div className="h-[3px] w-[244px] relative box-border border-t-[3px] border-solid border-coral-100"></div>
                </div>
              </div>
            </div>
            <div className="relative text-5xl font-rubik text-slategray mq450:text-lgi">
              Check out our special offer and discounts
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex items-center w-full">
        <div
          ref={scrollRef}
          className="flex flex-row items-start justify-start py-4 space-x-4 overflow-x-scroll no-scrollbar whitespace-nowrap"
        >
          {promo.map((promoItem) => (
            <FormPromo key={promoItem.id} promo={promoItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promo;
