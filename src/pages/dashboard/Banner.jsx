import React, { useState, useEffect } from "react";
import axios from "axios";
import BannerCard from "@/components/dashboard/BannerCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";
import Bar from "@/components/dashboard/Bar";
import { Paginator } from "primereact/paginator";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({ name: "" });
  const [first, setFirst] = useState(0); // Current page start index
  const [rows, setRows] = useState(6); // Number of items per page

  const getBanners = async () => {
    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners?page=${
          first / rows
        }&size=${rows}`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk5MDg1NzZ9.ao6_vk2T5Ia3Ez9ezF-T9q0PKOGv7XaIvdh_guEf_os",
          },
        }
      );
      setBanners(response.data.data);
    } catch (error) {
      console.error(error.response);
      toast.error("Failed to fetch banners. Please try again.");
    }
  };

  useEffect(() => {
    getBanners();
  }, [first, rows]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBanners = banners.filter((banner) =>
    banner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      imageUrl: imageUrl,
    };
    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk5MDg1NzZ9.ao6_vk2T5Ia3Ez9ezF-T9q0PKOGv7XaIvdh_guEf_os",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Banner created successfully");
        getBanners(); // Reload banners with updated data
        setIsModalOpen(false);
        setImageUrl("");
      } else {
        toast.error("Failed to create banner");
      }
    } catch (error) {
      console.error(error.response);
      toast.error("Failed to create banner");
    }
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
      setImageUrl(res.data.url); // Save image URL
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image!");
      console.log(error);
    }
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="w-full h-full bg-lightyellow">
      <div className="w-full h-full relative overflow-hidden flex flex-row items-start justify-start pb-[29.4px] pr-[18px] box-border gap-[12px] text-left text-xl text-indianred mq450:h-auto">
        <SideBar />
        <div className="flex flex-col justify-start gap-[32px] w-full pt-10 h-full mb-28">
          <Bar />
          <div className="flex flex-row items-center justify-between flex-shrink-0 p-2 mx-6 border-b-2 border-l-2 border-solid rounded-2xl mq450:flex-col mq450:items-start mq450:ml-2">
            <h1 className="text-3xl font-bold">Banner</h1>
            <button className="px-4 py-2 font-semibold text-black rounded-lg shadow-md bg-greenyellow hover:bg-yellowgreen-100 focus:outline-none">
              <a className="no-underline" onClick={() => setIsModalOpen(true)}>
                Create Banner
              </a>
            </button>
          </div>
          <div className="flex flex-row items-center justify-between mx-6 mq450:flex-col mq450:items-start mq450:ml-2">
            <input
              type="text"
              placeholder="Search Banner"
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4 mq450:gap-6">
            {filteredBanners.slice(first, first + rows).map((item) => (
              <BannerCard key={item.id} item={item} getBanners={getBanners} />
            ))}
          </div>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={filteredBanners.length}
            rowsPerPageOptions={[6]}
            onPageChange={onPageChange}
            className="paginator bg-lightyellow"
          />
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="relative w-full max-w-md p-6 bg-white rounded-lg mq450:w-2/3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute text-gray-600 top-2 right-2"
                >
                  &times;
                </button>
                <h2 className="mb-4 text-xl font-bold text-center">
                  Add Banner
                </h2>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Uploaded Banner"
                    className="object-cover w-full h-48 mb-4 rounded"
                  />
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Choose Banner</label>
                    <input
                      type="file"
                      onChange={handleUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Banner Name</label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full p-2 mt-2 border rounded"
                    />
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      type="submit"
                      className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Banner;
