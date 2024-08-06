import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, clearUser } from "../Redux/slice/userSlice";
import { setToken } from "../Redux/slice/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(user?.profilePictureUrl || '');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return imageUrl;
    const uploadData = new FormData();
    uploadData.append("image", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
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
      console.log('image url', res.data.url);
      return res.data.url;
    } catch (error) {
      toast.error("Failed to upload image!");
      console.log(error);
      throw error;
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
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      profilePictureUrl: newImageUrl,
    };
    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile`,
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Profile updated successfully');
      setIsModalOpen(false);
      dispatch(fetchUserDetails(token)); // Ensure user details are refreshed
    } catch (error) {
      console.error(error.response);
      toast.error('Failed to update profile');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !token) {
      dispatch(setToken(storedToken));
      dispatch(fetchUserDetails(storedToken));
    } else if (token && !user) {
      dispatch(fetchUserDetails(token));
    }
  }, [dispatch, token, user]);

  if (!user) {
    return <p>You are not logged in</p>;
  }


  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center max-w-lg p-6 mx-auto mb-40 shadow-lg bg-lightyellow rounded-3xl mt-28">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex items-center justify-center space-x-4">
            <img
              src={user?.profilePictureUrl}
              alt="Profile Picture"
              className="w-40 h-40 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
            </div>
          </div>
          <div className="flex items-center justify-center mr-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg">
              Edit
            </button>
          </div>
        </div>
        <form className="grid w-full gap-4 mt-6 md:grid-cols-1">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              className="block px-4 py-2 mt-1 border rounded-md shadow-sm w-60 md:w-60 focus:ring focus:ring-opacity-50"
              disabled
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={user.phoneNumber}
              className="block px-4 py-2 mt-1 border rounded-md shadow-sm w-60 md:w-60 focus:ring focus:ring-opacity-50"
              disabled
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-gray-700">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={user.role}
              className="block px-4 py-2 mt-1 border rounded-md shadow-sm w-60 md:w-60 focus:ring focus:ring-opacity-50"
              disabled
            />
          </div>
        </form>
        <div className="w-full mt-6">
          <h3 className="text-lg font-medium">My email Address</h3>
          <div className="flex items-center mt-2 space-x-2">
            <div className="p-2 rounded-full bg-whitesmoke">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
            </div>
            <div>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="grid w-full gap-4 mt-6 md:grid-cols-1">
              <div>
                <label className="block text-gray-700">
                  Profile Picture
                </label>
                <img src={imageUrl} alt="Profile Picture" className="w-40 h-40 rounded-full"></img>
                <input
                  type="file"
                  className="block px-4 py-2 mt-1 border rounded-md shadow-sm w-60 md:w-60 focus:ring focus:ring-opacity-50"
                  onChange={handleUpload}
                />
                
              </div>
              <div>
                <label className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  className="block px-4 py-2 mt-1 border rounded-md shadow-sm w-60 md:w-60 focus:ring focus:ring-opacity-50"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  className="block px-4 py-2 mt-1 border rounded-md shadow-sm w-60 md:w-60 focus:ring focus:ring-opacity-50"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  className="block px-4 py-2 mt-1 border rounded-md shadow-sm w-60 md:w-60 focus:ring focus:ring-opacity-50"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg">
                Cancel
              </button>
              <button 
                onClick={handleSubmit} 
                className="px-4 py-2 text-white bg-green-500 rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;


