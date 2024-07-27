import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Bar from "@/components/dashboard/Bar";

const CreateMenu = () => {
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    promo_code: "",
    minimum_claim_price: "",
    terms_condition: "",
    promo_discount_price: "",
  });

  const router = useRouter();

  const handleSubmit = async () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      promo_code: formData.promo_code,
      minimum_claim_price: parseInt(formData.minimum_claim_price),
      terms_condition: formData.terms_condition,
      promo_discount_price: parseInt(formData.promo_discount_price),
      imageUrl: imageUrl,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk5MDg1NzZ9.ao6_vk2T5Ia3Ez9ezF-T9q0PKOGv7XaIvdh_guEf_os",
      },
    };
    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo",
        payload,
        config
      );

      toast.success("Promo created successfully!");
      console.log(response.data.data);
      setImageUrl("");
    } catch (error) {
      toast.error("Failed to create promo!");
      console.error(error.response);
    }
    setTimeout(() => {
      router.push("/dashboard/Promo");
    }, 2000);
  };

  const handleUpload = async () => {
    const uploadData = new FormData();
    uploadData.append("image", file);

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
        uploadData,
        config
      );
      setImageUrl(res.data.url); // Simpan URL gambar
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image!");
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCancel = () => {
    router.push("/dashboard/Promo");
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full relative overflow-hidden flex flex-row items-start justify-start pt-0 pb-[29.4px] pr-[18px] pl-0 box-border gap-[12px]  text-left text-xl text-indianred font-body-2-regular mq800:pl-2 mq800:pr-6 mq800:box-border mq450:h-auto bg-white">
        <SideBar />
        <div className="flex flex-col items-start justify-start flex-1 ">
          <div className="self-stretch flex flex-col justify-start gap-[12px] max-w-full pl-2 pt-12">
            <Bar />
            <div className="inset-0 flex items-center justify-center -z-1">
              <div className="w-full h-auto max-w-2xl p-6 bg-white shadow-md rounded-xl">
                <h2 className="mt-2 mb-4 text-2xl font-semibold text-center ">
                  Create Promo
                </h2>
                {imageUrl && (
                  <div className="mt-4">
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="w-full mt-2 mb-8 h-60"
                    />
                  </div>
                )}
                <form>
                  <div className="flex mb-4 mq450:flex-1">
                    <div className="w-1/2 mr-4">
                      <label
                        htmlFor="title"
                        className="block mb-2 font-bold text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Example: Promo Hiking Family"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="image"
                        className="block mb-2 font-bold text-gray-700"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="imageUrl"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                      />
                      <button
                        type="button"
                        onClick={handleUpload}
                        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="block mb-2 font-bold text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="w-full p-2 border rounded"
                      onChange={handleChange}
                      placeholder="Describe the promo trip"
                    ></textarea>
                  </div>
                  <div className="mb-2">
                    <label className="block mb-2 font-bold text-gray-700">
                      Promo Code
                    </label>
                    <input
                      type="text"
                      id="promo_code"
                      name="promo_code"
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Example: HIKINGFAMILY"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block mb-2 font-bold text-gray-700">
                      Minimum Claim Price
                    </label>
                    <input
                      type="number"
                      id="minimum_claim_price"
                      name="minimum_claim_price"
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Example: 50000"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block mb-2 font-bold text-gray-700">
                      Terms & Conditions
                    </label>
                    <textarea
                      id="terms_condition"
                      name="terms_condition"
                      className="w-full p-2 border rounded"
                      onChange={handleChange}
                      placeholder="Please give the terms and conditions"
                    ></textarea>
                  </div>
                  <div className="mb-2">
                    <label className="block mb-2 font-bold text-gray-700">
                      Promo Discount Price
                    </label>
                    <input
                      type="number"
                      name="promo_discount_price"
                      id="promo_discount_price"
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Example: 50000"
                    />
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
                    >
                      Create Promo
                    </button>
                    <button
                      onClick={handleCancel}
                      type="button"
                      className="px-4 py-2 text-white bg-red-500 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateMenu;
