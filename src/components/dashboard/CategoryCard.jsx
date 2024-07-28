import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import moment from "moment";
import "@fortawesome/fontawesome-free/css/all.min.css";

const CategoryCard = ({ item, getCategorys }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(item?.imageUrl);
  const [formData, setFormData] = useState({
    name: item?.name,
  });

  const handleDelete = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk5MDg1NzZ9.ao6_vk2T5Ia3Ez9ezF-T9q0PKOGv7XaIvdh_guEf_os",
      },
    };
    try {
      const response = await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${item.id}`,
        config
      );
      if (response.status === 200) {
        toast.success("Category deleted successfully");
        setIsModalOpen(false);
        getCategorys();
      } else {
        console.log(response);
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.error(error.response);
      toast.error("Failed to delete category");
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newImageUrl = imageUrl;
    if (file) {
      try {
        newImageUrl = await handleUpload();
      } catch (error) {
        return;
      }
    }
    const payload = {
      name: formData.name,
      imageUrl: imageUrl,
    };
    try {
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${item.id}`,
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
        toast.success("Category updated successfully");
        setIsEditModalOpen(false);
        getCategorys();
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      console.error(error.response);
      toast.error("Failed to create category");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="overflow-hidden bg-white shadow-lg rounded-xl w-96 mq800:w-full">
      <div className="relative">
        <img className="w-full transition-transform duration-300 transform h-52 hover:scale-110 " src={item?.imageUrl} alt={item?.name} />
        <div className="absolute flex gap-2 space-x-2 top-2 right-2">
          <i
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 text-blue-500 bg-blue-100 rounded-full cursor-pointer fas fa-edit hover:text-blue-700"
            aria-hidden="true"
          ></i>
          <i
            onClick={() => setIsModalOpen(true)}
            className="p-2 text-red-500 bg-blue-100 rounded-full cursor-pointer fas fa-trash hover:text-red-700"
            aria-hidden="true"
          ></i>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{item?.name}</div>
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
          Last Update:{" "}
          {moment(item?.updatedAt).format("DD MMM YYYY - HH:mm:ss")}
        </p>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg">
            <p>Are you sure you want to delete category {item.name}?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Edit category {item.name}</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                &times;
              </button>
            </div>

            <div className="p-4">
              <img
                src={imageUrl}
                alt="category Image"
                className="w-full mb-4 rounded-lg"
              ></img>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Choose Banner
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              ></input>
              <button
                onClick={handleUpload}
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Upload
              </button>
              <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
                category Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleChange}
                name="name"
                required
                className="w-56 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></input>
            </div>

            <div className="flex items-center justify-end p-4 border-t">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CategoryCard;
