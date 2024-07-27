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
    <div className="overflow-hidden bg-white rounded shadow-lg w-96 mq800:w-full">
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
          <i className="fas fa-calendar" aria-hidden="true"></i>
        </span>
        Created At: {moment(item?.createdAt).format("DD MMM YYYY - HH:mm:ss")}
      </p>
      <p className="flex items-center text-base text-gray-700">
        <span className="mr-2">
          <i className="fas fa-calendar" aria-hidden="true"></i>
        </span>
        Last Update: {moment(item?.updatedAt).format("DD MMM YYYY - HH:mm:ss")}
      </p>
    </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 p-4 bg-white rounded-lg">
            <p className="text-lg">Are you sure you want to delete {item?.title}?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 mr-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CardPromo;
