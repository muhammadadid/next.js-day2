import React, { useState, useRef } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Bar from "@/components/dashboard/Bar";

const CreateMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const toast = useRef(null);
  const router = useRouter();

  const steps = [
    { label: "Basic Information" },
    { label: "Image Upload" },
    { label: "Additional Details" },
  ];

  const validateStep1 = () => {
    const { title } = formData;
    if (!title) {
      toast.current.show({ severity: 'error', summary: 'Validation Error', detail: 'Title is required!' });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!imageUrl) {
      toast.current.show({ severity: 'error', summary: 'Validation Error', detail: 'Image is required!' });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const { description, promo_code, minimum_claim_price, terms_condition, promo_discount_price } = formData;
    if (!description || !promo_code || !minimum_claim_price || !terms_condition || !promo_discount_price) {
      toast.current.show({ severity: 'error', summary: 'Validation Error', detail: 'All fields are required!' });
      return false;
    }
    return true;
  };

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

      toast.current.show({
        severity: "success",
        summary: "Promo Created",
        detail: "Promo created successfully!",
      });
      console.log(response.data.data);
      setImageUrl("");
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to create promo!",
      });
      console.error(error.response);
    }
    setTimeout(() => {
      router.push("/dashboard/Promo");
    }, 2000);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
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
      setImageUrl(res.data.url); // Save the image URL
      toast.current.show({
        severity: "success",
        summary: "Image Uploaded",
        detail: "Image uploaded successfully!",
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to upload image!",
      });
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    router.push("/dashboard/Promo");
  };
  const goToNextStep = () => {
    let isValid = false;

    switch (activeIndex) {
      case 0:
        isValid = validateStep1();
        break;
      case 1:
        isValid = validateStep2();
        break;
      case 2:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
        break;
    }

    if (isValid) {
      setActiveIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
    <div className="w-full h-full bg-lightyellow">
      <Toast ref={toast} />
      <div className="w-full h-full relative overflow-hidden flex flex-row items-start justify-start pb-[29.4px] pr-[18px] box-border gap-[12px] text-left text-xl text-indianred mq450:h-auto">
        <SideBar />
        <div className="flex flex-col items-start justify-start flex-1">
          <div className="self-stretch flex flex-col justify-start gap-[12px] max-w-full pl-2 pt-12 pb-36">
            <Bar />
            <div className="inset-0 flex items-center justify-center pt-12 -z-1">
              <div className="w-full h-auto max-w-2xl p-6 bg-white shadow-md rounded-xl mq450:w-72">
                <h2 className="mt-2 mb-4 text-2xl font-semibold text-center">
                  Create Promo
                </h2>
                <Steps
                  model={steps}
                  activeIndex={activeIndex}
                  onSelect={(e) => setActiveIndex(e.index)}
                  className="mq450:hidden"
                />
                <div className="mt-4">
                  {activeIndex === 0 && (
                    <div>
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
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-xl"
                            placeholder="Example: Promo Hiking Family"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <button 
                        type="button" 
                        onClick={handleCancel}
                        className="px-4 py-2 text-white bg-red-500 rounded-xl hover:bg-red-700">
                        Cancel
                        </button>
                        <button
                          type="button"
                          onClick={goToNextStep}
                          className="px-4 py-2 text-white bg-green-500 rounded-xl hover:bg-green-700"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                  {activeIndex === 1 && (
                    <div>
                      <div className="w-full mb-4">
                        {imageUrl && (
                          <div className="mt-4">
                            <img
                              src={imageUrl}
                              alt="Uploaded"
                              className="w-full mt-2 mb-8 h-60"
                            />
                          </div>
                        )}
                        <label
                          htmlFor="image"
                          className="block mb-4 font-bold text-gray-700"
                        >
                          Image
                        </label>
                        <input
                          type="file"
                          id="image"
                          name="imageUrl"
                          onChange={handleUpload}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        ></input>
                      </div>
                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => setActiveIndex(0)}
                          className="px-4 py-2 text-white bg-red-500 rounded-xl hover:bg-red-700"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={goToNextStep}
                          className="px-4 py-2 text-white bg-green-500 rounded-xl hover:bg-green-700"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                  {activeIndex === 2 && (
                    <div>
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
                      <div className="flex justify-between">
                        
                      <button
                        type="button"
                        onClick={() => setActiveIndex(1)}
                        className="px-4 py-2 text-white bg-red-500 rounded-xl hover:bg-red-700"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 text-white bg-green-500 rounded-xl hover:bg-green-700"
                        >
                        Submit
                      </button>
                        </div>
                    </div>
                  )}
                </div>
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
