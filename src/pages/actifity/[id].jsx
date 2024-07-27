import React, { useState, useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import withAuth from "@/components/withAuth";

const actifityDetail = () => {
  const [actifity, setActifity] = useState([]);
  const [htmlContent, setHtmlContent] = useState("");

  const router = useRouter();
  const { id } = router.query;

  const handleBack = () => {
    router.push("/Actifity");
  };

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  
  const getActifity = async () => {
    if (!id) return;
    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setActifity(response.data.data);
      setHtmlContent(response.data.data.location_maps);
      console.log(response.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getActifity();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="h-auto max-w-4xl p-4 mx-auto mt-20 bg-white rounded-lg shadow-lg">
        <h1 className="mb-2 text-2xl font-bold text-blue-800">
          {actifity?.title}
        </h1>
        <p className="mb-4 text-gray-600">
          {actifity?.address},{actifity?.city}, {actifity?.province}
        </p>
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <img
              src={actifity?.imageUrls}
              alt={actifity?.title}
              width={800}
              height={450}
              className="w-full h-auto rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-48 mb-10">
          <div className="p-4 rounded-lg bg-[#03346E] w-[480px]">
            <h2 className="text-3xl font-bold text-white">Information</h2>
            <p className="text-slate-300">Description : {actifity?.description}</p>
            <p className="text-slate-300">Price Discount : {formatToIDR(actifity?.price_discount)}</p>
            <p className="text-slate-300">Rating : {actifity?.rating}/5({actifity?.total_reviews})</p>
            <p className="text-slate-300">Facilities : {actifity?.facilities}</p>
          </div>
          <div className="p-4 rounded-lg h-28 bg-darkslateblue w-80">
            <p className="text-lg text-slate-300">
              Mulai dari
            </p>
            <div className="flex items-center justify-between ">
              <p className="pt-0 text-xl font-bold text-white">{formatToIDR(actifity?.price)}</p>
              <button className="px-4 py-2 rounded bg-greenyellow">
                Cari Pilihan
              </button>
            </div>
          </div>
        </div>
        <div className="items-center justify-center mb-4 ">
          
          <h2 className="text-lg font-bold">Location Maps</h2>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}>
          </div>
        </div>
        <div className="pt-6 mb-40 ">
          <h2 className="text-lg font-bold">Category : {actifity?.category?.name}</h2>
          <div className="flex items-start space-x-4">
            <img
              src={actifity?.category?.imageUrl}
              alt={actifity?.category?.name}
              className="w-48 h-40 rounded"
            />
          </div>
          <button className="px-4 py-2 mt-4 text-white bg-red-500 rounded" onClick={handleBack}>Back</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(actifityDetail);
