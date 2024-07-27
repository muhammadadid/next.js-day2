import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "@/components/SideBar";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Bar from "@/components/dashboard/Bar";

const EditPromo = ({ item }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(item?.imageUrl || "");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    promo_code: "",
    minimum_claim_price: "",
    terms_condition: "",
    promo_discount_price: "",
  });

  const router = useRouter();
  const { id } = router.query;
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
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${id}`,
        payload,
        config
      );
      toast.success("Promo updated successfully!");
      console.log(response.data.data);
    } catch (error) {
      toast.error("Failed to update promo!");
      console.error(error);
    }
    setTimeout(() => {
      router.push("/dashboard/Promo");
    }, 2000);
  };

  const fetchPromo = async () => {
    if (id) {
      try {
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response.data.data;
        setFormData({
          title: data.title,
          description: data.description,
          promo_code: data.promo_code,
          minimum_claim_price: data.minimum_claim_price,
          terms_condition: data.terms_condition,
          promo_discount_price: data.promo_discount_price,
          imageUrl: data.imageUrl,
        });
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchPromo();
  }, [id]);

  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected for upload.");
      return;
    }
    const uploadData = new FormData();
    uploadData.append("image", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer YOUR_AUTH_TOKEN",
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    };

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        uploadData,
        config
      );
      setImageUrl(res.data.url); // Save image URL
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image!");
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCancel = () => {
    router.push("/dashboard/Promo");
  };
  return (
    <div className="w-full h-full bg-lightyellow">
      <div className="w-full h-auto relative overflow-hidden flex flex-row items-start justify-start pt-0 pb-[29.4px] pr-[18px] pl-0 box-border gap-[12px]  text-left text-xl text-indianred font-body-2-regular mq800:pl-2 mq800:pr-6 mq800:box-border mq450:h-auto bg-white">
        <SideBar />
        <div className="flex flex-col items-start justify-start flex-1 ">
          <div className="self-stretch flex flex-col justify-start gap-[12px] max-w-full pl-2 pt-12">
            <Bar />
            <div className="w-full max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
              <h1 className="mb-8 text-3xl font-bold text-center ">
                Edit Promo
              </h1>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded Category"
                  className="object-cover w-full h-64 mb-4 rounded"
                />
              )}
              <div>
                <div className="grid grid-cols-2 gap-6 mq800:grid-cols-1">
                  <div className="pr-8 ">
                    <div className="mb-6">
                      <label className="block mb-2 font-bold text-gray-700">
                        Title
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 font-bold text-gray-700">
                        Description
                      </label>
                      <textarea
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 font-bold text-gray-700">
                        Promo Code
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="promo-code"
                        type="text"
                        name="promo_code"
                        value={formData.promo_code}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-6">
                      <label
                        className="block mb-2 font-bold text-gray-700"
                        for="min-claim-price"
                      >
                        Minimum Claim Price
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="min-claim-price"
                        type="text"
                        name="minimum_claim_price"
                        value={formData.minimum_claim_price}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 font-bold text-gray-700">
                        Terms & Conditions
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="terms"
                        type="text"
                        name="terms_conditions"
                        value={formData.terms_condition}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 font-bold text-gray-700">
                        Promo Discount Price
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="promo-discount-price"
                        type="text"
                        name="promo_discount_price"
                        value={formData.promo_discount_price}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="mb-6">
                      <label className="block mb-2 font-bold text-gray-700">
                        Image File
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="image"
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        value={formData.image}
                      ></input>
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        onClick={handleUpload}
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
                    onClick={handleSubmit}
                  >
                    Update Promo
                  </button>
                  <button
                    className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
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

export default EditPromo;
