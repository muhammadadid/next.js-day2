import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import moment from "moment";
import Footer from "@/components/Footer";
import withAuth from "@/components/withAuth";

const PromoDetail = () => {
  const [promo, setPromo] = useState({});

  const router = useRouter();
  const { id } = router.query;

  const handleBack = () => {
    router.push("/Promo");
  };

  const getPromo = async () => {
    if (!id) {
      return;
    }
    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPromo(response.data.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPromo();
  }, [id]);
  return (
    <div>
      <Navbar />
      <form className="grid w-full max-w-6xl grid-cols-1 gap-6 p-5 mx-auto border border-gray-300 mb-36 mt-28 rounded-3xl mq1750:grid-cols-2 mq800:grid-cols-1 bg-slate-100 ">
        <div
          className="relative w-full h-[582px] bg-cover bg-center bg-no-repeat rounded-3xs"
          style={{ backgroundImage: `url(${promo?.imageUrl})` }}
        ></div>

        <div className="flex flex-col gap-4">
          <div className="text-left">
            <h2 className="mb-2 font-bold text-32xl text-darkslateblue">
              {promo?.title}
            </h2>
            <b className="text-21xl text-primary-color-dark-blue-80">
              Rp. {promo?.promo_discount_price}
            </b>
          </div>

          <div className="pb-4 space-y-2 border-b border-gray-300">
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">
                Description
              </span>
              <span className="text-lg font-medium text-gray-600">
                : {promo?.description}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">
                Promo Code
              </span>
              <span className="text-lg font-medium text-gray-600">
                : {promo?.promo_code}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">
                Minimum Claim Price
              </span>
              <span className="text-lg font-medium text-gray-600">
                : Rp.{promo?.minimum_claim_price}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">
                Discount Price
              </span>
              <span className="text-lg font-medium text-gray-600">
                : Rp.{promo?.promo_discount_price}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">
                Terms Condition
              </span>
              <span className="text-lg font-medium text-gray-600">
                : {promo?.terms_condition}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">
                Created At
              </span>
              <span className="text-lg font-medium text-gray-600">
                : {moment(promo?.createdAt).format("DD MMMM YYYY • HH:mm:ss")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">
                Last Updated
              </span>
              <span className="text-lg font-medium text-gray-600">
                : {moment(promo?.updatedAt).format("DD MMM YYYY • HH:mm:ss")}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="justify-end w-12 py-2 font-bold text-white bg-red-500 rounded-xl hover:bg-red-700"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default withAuth(PromoDetail);
