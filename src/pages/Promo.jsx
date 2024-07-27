import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import FormPromo from "@/components/FormPromo";

const Promo = () => {
  const [promo, setPromo] = useState([]);

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
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPromo();
  }, []);

  return (
    <div className="">
      <div className="z-[10] top-0 absolute w-full flex flex-row items-start justify-start"> 
      <Navbar />
      </div>
      <div className="w-full relative mt-28  bg-white overflow-hidden flex flex-col items-start justify-start gap-[134px] leading-[normal] tracking-[normal] mq800:gap-[67px] mq450:gap-[33px]">
        <div className=" w-full relative overflow-hidden flex flex-col items-end justify-start gap-[77px] leading-[normal] tracking-[normal] text-left text-base  font-body-14px-medium mq450:gap-[19px] ">
          <main className="self-stretch flex flex-col items-start justify-start gap-[7px] max-w-full">
            <section className="self-stretch flex flex-row items-start justify-center pt-0 px-5 pb-[25px] box-border max-w-full text-left text-sm text-neutral-color-60 font-body-14px-medium">
              <div className="w-[1180px] flex flex-col items-start justify-start gap-[9px] max-w-full">
                <div
                  className="self-stretch h-[378px] mt-28 relative rounded-xl overflow-hidden shrink-0 max-w-full text-[52px] text-neutral-color-00 bg-cover bg-center"
                  style={{ backgroundImage: "url(/images/lo.jpg)" }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-start justify-center pt-[10%] pb-[10%] pr-[5%] pl-[5%] box-border gap-[2px] max-w-full">
                    <div className="w-[816.4px] h-[799.5px] absolute m-0 top-[728.33px] right-[-944.2px] rounded-[99px] transform rotate-[160.2deg]"></div>
                    <h1 className="m-0 w-full relative text-inherit leading-tight capitalize font-normal font-inherit inline-block max-w-full z-[1] text-right mq450:text-[31px] mq450:leading-[41px] mq800:text-[36px] mq800:leading-[45px] mq1125:text-[42px] mq1125:leading-[54px] mq1350:text-[48px] mq1350:leading-[60px] mq1750:text-[52px] mq1750:leading-[68px]">
                      Best Offer
                    </h1>
                    <div className="self-stretch relative text-2xl leading-normal text-right z-[1]  mq450:text-xl mq450:leading-[20px] mq800:text-2xl mq800:leading-[22px] mq1125:text-3xl mq1125:leading-[24px] mq1350:text-4xl mq1350:leading-[26px] mq1750:text-5xl mq1750:leading-[28px]">
                      The world is a book, and those who do not travel read only
                      one page
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="box-border flex flex-row items-start self-stretch justify-center max-w-full px-5 py-0 text-5xl text-left text-primary-color-dark-blue font-body-14px-medium">
              <div className="w-[1400px] flex flex-col items-start justify-start max-w-full text-32xl mb-10 ">
                <div className="flex-1 flex flex-col items-start justify-start gap-[100px] max-w-full mq800:gap-[50px] mq450:gap-[25px]">
                  <div className="flex flex-col items-start self-stretch justify-start max-w-full">
                    <div className="self-stretch flex flex-row items-end justify-between max-w-full gap-[20px] mq800:flex-wrap">
                      <div className="w-[172px] flex flex-row items-start justify-start gap-[40px]">
                      </div>
                      <div className="w-[460px] flex flex-col items-start justify-start gap-[29px] max-w-full">
                        <div className="flex flex-row items-start self-stretch justify-end max-w-full">
                          <div className="w-[369px] flex flex-col items-start justify-start gap-[20px] max-w-full">
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
                  <div className="mb-20 self-stretch grid flex-row items-start justify-start gap-[32px] max-w-full grid-cols-[repeat(3,_minmax(328px,_1fr))] text-9xl text-slategray font-rubik mq800:gap-[16px] mq800:grid-cols-[minmax(328px,_1fr)] mq1125:justify-center mq1125:grid-cols-[repeat(2,_minmax(328px,_568px))]">
                    {promo.map((promo) => (
                      <FormPromo key={promo.id} promo={promo} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Promo;
