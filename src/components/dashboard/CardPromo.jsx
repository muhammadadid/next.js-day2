import { toast } from "react-toastify";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';
import moment from "moment";


const CardPromo = ({ item, getPromo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk5MDg1NzZ9.ao6_vk2T5Ia3Ez9ezF-T9q0PKOGv7XaIvdh_guEf_os",
        },
      };
      const response = await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${item.id}`,
        config
      );
      if (response.status === 200) {
        toast.success("Promo deleted successfully");
        setIsModalOpen(false);
        getPromo();
      } else {
        console.log(response);
        toast.error("Failed to delete promo");
      }
    } catch (error) {
      console.error(error.response);
      toast.error("Failed to delete promo");
    }
  };
  const toggleClick = () => {
    router.push(`/dashboard/promo/${item?.id}`);
  };
 

  return (
    <div className="overflow-hidden bg-white shadow-lg rounded-xl w-96 mq800:w-full">
    <div className="relative">
      <img className="w-full transition-transform duration-300 transform h-52 hover:scale-110" src={item?.imageUrl} alt={item?.title} />
      <div className="absolute flex gap-2 space-x-2 top-2 right-2">
        <i 
        onClick={toggleClick}
        className="p-2 text-blue-500 bg-blue-100 rounded-full cursor-pointer fas fa-edit hover:text-blue-700" aria-hidden="true"></i>
        <i 
        onClick={() => setIsModalOpen(true)}
        className="p-2 text-red-500 bg-blue-100 rounded-full cursor-pointer fas fa-trash hover:text-red-700" aria-hidden="true"></i>
      </div>
    </div>
    <div className="px-6 py-4">
      <div className="mb-2 text-xl font-bold">{item?.title}</div>
      <p className="flex items-center text-base text-gray-700">
        <span className="mr-2">
          <i className="text-green-500 fas fa-calendar-plus" aria-hidden="true"></i>
        </span>
        Created At: {moment(item?.createdAt).format("DD MMM YYYY - HH:mm:ss")}
      </p>
      <p className="flex items-center text-base text-gray-700">
        <span className="mr-2">
          <i className="text-blue-500 fas fa-calendar-check" aria-hidden="true"></i>
        </span>
        Last Update: {moment(item?.updatedAt).format("DD MMM YYYY - HH:mm:ss")}
      </p>
    </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
        <div className="p-6 bg-white shadow-lg rounded-xl w-80">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="60"
              height="60"
              id="warning"
            >
              <path
                fill="#f48b78"
                d="M256,16C123.452,16,16,123.452,16,256s107.452,240,240,240s240-107.452,240-240S388.548,16,256,16z
  M256,376.495c-7.732,0-14-6.268-14-14s6.268-14,14-14c7.732,0,14,6.268,14,14S263.732,376.495,256,376.495z M270,319.678
  c0,7.732-6.268,14-14,14s-14-6.268-14-14V139.053c0-7.732,6.268-14,14-14s14,6.268,14,14V319.678z"
              ></path>
              <path
                fill="#dd5142"
                d="M256,125.053c-7.732,0-14,6.268-14,14v180.625c0,7.732,6.268,14,14,14s14-6.268,14-14V139.053
  C270,131.321,263.732,125.053,256,125.053z"
              ></path>
              <circle cx="256" cy="362.496" r="14" fill="#dd5142"></circle>
            </svg>
          </div>

          <p className="mt-4 text-lg text-center">
            Delete <span className="font-bold">{item?.title}</span> Promo?
          </p>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-800 rounded hover:bg-red-400"
            >
              Keep it
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded bg-greenyellow hover:bg-yellowgreen-200"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
export default CardPromo;
