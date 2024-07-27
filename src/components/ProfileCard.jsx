import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEllipsisV } from "react-icons/fa";
import axios from "axios";

const ProfileCard = ({ user, getUser }) => {
  const [role, setRole] = useState(user.role);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const toggleRole = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${user.id}`,
        { role },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk5MDg1NzZ9.ao6_vk2T5Ia3Ez9ezF-T9q0PKOGv7XaIvdh_guEf_os",
          },
        }
      );
      if(response.status === 200) {
        toast.success("Role updated successfully");
        setRole(response.data.role);
        getUser();
        setIsModalOpen(false);
      } else {
        toast.error("Failed to update role");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    } setTimeout(() => {
      getUser();
    },2000)
  };

  return (
    <div className="flex-1 w-full mx-2 mb-4">
      <div className="overflow-hidden shadow-lg rounded-7xl w-60 bg-[#FFFFB3]">
        <div className="relative">
          <div className="flex items-center justify-center h-32 bg-gray-100">
            <img
              src={user?.profilePictureUrl || "/images/deaflut.jpg"}
              alt="Profile Picture"
              className={"object-cover w-32 h-32 rounded-full"}
            />
            <button
              className="absolute p-2 text-black cursor-pointer rounded-xl top-4 right-4 hover:text-slate-400"
              onClick={() => setIsModalOpen(true)}
            >
              <FaEllipsisV />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h2 className="font-semibold text-lgi ">{user?.name}</h2>
          <p className="text-sm text-gray-600">
            <span className="flex items-center text-slate-800">
              <svg
                className="w-5 h-5 mr-1 text-slate-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
              {user?.email}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            <span className="flex items-center text-slate-800">
              <svg
                className="w-5 h-5 mr-1 text-slate-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16.434.001a.826.826 0 00-.164.008l-3.423.543a2.635 2.635 0 01-2.189 3.01 2.629 2.629 0 01-3.01-2.185l-3.417.538a.818.818 0 00-.677.931l3.24 20.467a.818.818 0 00.931.677l3.423-.543a2.635 2.635 0 012.189-3.01 2.629 2.629 0 013.01 2.185l3.422-.543a.818.818 0 00.677-.93L17.2.685a.816.816 0 00-.767-.685zm-3.22 6.534c.066 0 .128.005.185.017.423.09.975.6 1.315.955.178.187.192.519.048.73l-1.228 1.795a.89.89 0 01-.437.283c-.504.125-1.248-.95-1.771 1.507-.524 2.458.59 1.776 1.003 2.098a.828.828 0 01.283.437l.394 2.14a.613.613 0 01-.341.649c-.456.182-1.167.427-1.589.336-.907-.192-2.342-2.4-1.57-6.044.725-3.415 2.71-4.89 3.708-4.903Z" />
              </svg>
              {user?.phoneNumber}
            </span>
          </p>
          <button className={`w-full py-2 mt-4 text-sm font-semibold rounded-81xl text-white ${role === "user" ? "bg-yellowgreen-100" : "bg-darkblue"}`}>
            {user?.role}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mq450:w-1/2">
            <h2 className="mb-4 text-lg font-medium">Change Role</h2>
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={toggleRole}
              className="w-full py-2 mt-4 text-sm font-semibold text-white bg-blue-500 rounded-md"
              disabled={loading}
            >
              {loading ? "Updating..." : "Change Role"}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2 mt-4 text-sm font-semibold text-white bg-red-500 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
