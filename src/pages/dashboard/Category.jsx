import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryCard from "@/components/dashboard/CategoryCard";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";
import Bar from "@/components/dashboard/Bar";
import { Paginator } from "primereact/paginator";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [first, setFirst] = useState(0); // For pagination
  const [rows, setRows] = useState(6); // Items per page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
  });

  const getCategorys = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk5MDg1NzZ9.ao6_vk2T5Ia3Ez9ezF-T9q0PKOGv7XaIvdh_guEf_os",
          },
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error(error.response);
      toast.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    getCategorys();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      imageUrl: imageUrl,
    };
    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category",
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
        toast.success("Category created successfully");
        getCategorys();
        setIsModalOpen(false);
        setImageUrl("");
      } else {
        toast.error("Failed to create category");
      }
    } catch (error) {
      console.error(error.response);
      toast.error("Failed to create category");
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
      setImageUrl(res.data.url); 
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image!");
      console.log(error);
    }
  };

 

  const filteredCategories = categories.filter(
    (category) =>
      category.name &&
      category.name.toLowerCase().includes(search.toLowerCase())
  );

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
            <h1 className="text-3xl font-bold">Category</h1>
            <button
              className="px-4 py-2 font-semibold text-black rounded-lg shadow-md bg-greenyellow hover:bg-yellowgreen-100 focus:outline-none"
              onClick={() => setIsModalOpen(true)}
            >
              Create Category
            </button>
          </div>
          <div className="flex flex-row items-center justify-between mx-6 mq450:flex-col mq450:items-start mq450:ml-2">
            <input
              type="text"
              placeholder="Search Category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4 mq450:gap-6">
            {filteredCategories.length > 0 ? (
              filteredCategories
                .slice(first, first + rows)
                .map((item) => (
                  <CategoryCard
                    key={item.id}
                    item={item}
                    getCategorys={getCategorys}
                  />
                ))
            ) : (
              <p className="text-center text-gray-700 col-span-full">
                No categories found
              </p>
            )}
          </div>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={filteredCategories.length}
            rowsPerPageOptions={[6]}
            onPageChange={onPageChange}
            className="paginator bg-lightyellow"
          />
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="relative w-full max-w-md p-6 bg-white rounded-lg">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute text-gray-600 top-2 right-2"
                >
                  &times;
                </button>
                <h2 className="mb-4 text-xl font-bold text-center">
                  Add Category
                </h2>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Uploaded Category"
                    className="object-cover w-full h-48 mb-4 rounded"
                  />
                )}
                <form onSubmit={handleSubmit}>
                  <div className="gap-4 mb-4">
                    <label className="block text-gray-700">
                      Choose Category Image
                    </label>
                    <input
                      type="file"
                      onChange={handleUpload}
                      className="w-full p-2 mt-2 border rounded"
                    />
                    
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Category Name</label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full p-2 mt-2 border rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
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

export default Category;
