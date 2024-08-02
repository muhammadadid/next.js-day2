import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";
import Bar from "@/components/dashboard/Bar";

const EditActivity = () => {
  const [file, setFile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    description: "",
    price: "",
    price_discount: "",
    rating: "",
    total_reviews: "",
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };

    const fetchActivity = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
            {
              headers: {
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk5MDg1NzZ9.ao6_vk2T5Ia3Ez9ezF-T9q0PKOGv7XaIvdh_guEf_os",
              },
            }
          );
          const data = response.data.data;
          setFormData({
            title: data.title,
            categoryId: data.categoryId,
            description: data.description,
            price: data.price,
            price_discount: data.price_discount,
            rating: data.rating,
            total_reviews: data.total_reviews,
            facilities: data.facilities,
            address: data.address,
            province: data.province,
            city: data.city,
            location_maps: data.location_maps,
          });
          setImageUrls(data.imageUrls);
        } catch (error) {
          console.error("Error fetching activity:", error);
          toast.error("Failed to load activity");
        }
      }
    };

    fetchCategories();
    fetchActivity();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseInt(formData.price),
      imageUrls: imageUrls,
    };

    console.log("Payload:", payload);

    const config = {
      headers: {
        "Content-Type": "application/json",
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
      },
    };

    try {
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${id}`,
        payload,
        config
      );
      toast.success("Activity updated successfully");
      router.push("/dashboard/actifity/Actifity");
    } catch (error) {
      console.error(error.response);
      toast.error("Failed to update activity");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected!");
      return;
    }
    const uploadData = new FormData();
    uploadData.append("image", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
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
      console.log("Image upload response:", res.data);
      setImageUrls([res.data.url]);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image!");
      console.log("Image upload error:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageDelete = (url) => {
    setImageUrls((prevUrls) => prevUrls.filter((imageUrl) => imageUrl !== url));
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-full bg-lightyellow">
      <div className="w-full h-full relative overflow-hidden flex flex-row items-start justify-start pb-[29.4px] pr-[18px] box-border gap-[12px] text-left text-xl text-indianred mq450:h-auto">
        <SideBar />
        <div className="flex flex-col items-start justify-start flex-1 ">
          <div className="self-stretch flex flex-col justify-start gap-[12px] max-w-full pl-2 pt-12 pb-28">
            <Bar />
            <div className="w-full max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md ">
              <div className="w-full max-w-4xl p-8 ">
                <h1 className="mb-6 text-2xl font-bold text-center">
                  Edit Activity
                </h1>
                <div className="mb-6">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative mb-4">
                      <img
                        src={url}
                        alt={`Activity Image ${index + 1}`}
                        className="object-cover w-full rounded shadow-md h-80"
                      />
                      <button
                        onClick={() => handleImageDelete(url)}
                        className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 mq450:grid-cols-1">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image Files
                      </label>
                      <input
                        type="file"
                        id="image"
                        onChange={handleFileChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={handleUpload}
                        className="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700"
                      >
                        Upload Image
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      >
                        <option value="">Select</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleOnChange}
                        id="price"
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price Discount
                      </label>
                      <input
                        type="text"
                        name="price_discount"
                        value={formData.price_discount}
                        id="price-discount"
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Rating
                      </label>
                      <input
                        type="text"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Total Review
                      </label>
                      <input
                        type="text"
                        id="total-review"
                        name="total_reviews"
                        value={formData.total_reviews}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Facilities
                      </label>
                      <input
                        type="text"
                        id="facilities"
                        name="facilities"
                        value={formData.facilities}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Province
                      </label>
                      <input
                        type="text"
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Location Maps
                      </label>
                      <input
                        type="text"
                        id="location_maps"
                        name="location_maps"
                        value={formData.location_maps}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-700"
                    >
                      Update Activity
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        router.push("/dashboard/actifity/Actifity")
                      }
                      className="items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-red-700 rounded-md hover:bg-red-500"
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

export default EditActivity;
