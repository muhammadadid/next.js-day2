import React, { useEffect, useState } from "react";
import axios from "axios";
import ActifityCard from "@/components/dashboard/ActifityCard";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";
import Bar from "@/components/dashboard/Bar";
import { Paginator } from "primereact/paginator";
import SortDropdown from "@/components/SortDropdown";

const Actifity = () => {
  const [actifity, setActifity] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [first, setFirst] = useState(0); // For pagination
  const [rows, setRows] = useState(6);   // Items per page

  const getActifity = async (categoryId = "") => {
    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${
          categoryId ? `activities-by-category/${categoryId}` : "activities"
        }`,
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
      setFilteredActivities(response.data.data); // Initialize filtered activities
      console.log(response.data.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    getActifity();
  }, []);

  const handleSortChange = async (categoryId) => {
    console.log("Selected Category ID:", categoryId); // Log selected category ID
    setCategoryId(categoryId);
    getActifity(categoryId);
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
            <h1 className="text-3xl font-bold">Actifity</h1>
            <button className="px-4 py-2 font-semibold text-black rounded-lg shadow-md bg-greenyellow hover:bg-yellowgreen-100 focus:outline-none">
              <a className="no-underline" href="/dashboard/actifity/CreateActifity">
                Create Actifity
              </a>
            </button>
          </div>
          <div className="flex flex-row items-center justify-between mx-6 mq450:flex-col mq450:items-start mq450:ml-2">
          <SortDropdown  onSortChange={handleSortChange} />  
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4 mq450:gap-6">
            {actifity.slice(first, first + rows).map((item) => (
              <ActifityCard key={item.id} item={item} getActifity={getActifity} />
            ))}
            {actifity.length === 0 && (
              <p className="text-center text-gray-700 col-span-full">
                No activities found
              </p>
            )}
          </div>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={actifity.length}
            rowsPerPageOptions={[6]}
            onPageChange={onPageChange}
            className="paginator bg-lightyellow"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Actifity;
