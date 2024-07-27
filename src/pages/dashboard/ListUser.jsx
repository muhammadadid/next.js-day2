import SideBar from "@/components/SideBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "@/components/ProfileCard";
import Footer from "@/components/Footer";
import Bar from "@/components/dashboard/Bar";
import { Paginator } from "primereact/paginator";

const ListUser = () => {
  const [user, setUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
        {
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk5MDg1NzZ9.ao6_vk2T5Ia3Ez9ezF-T9q0PKOGv7XaIvdh_guEf_os",
          },
        }
      );
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setFirst(0); // Reset pagination when searching
  };

  const filteredUser = user.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUser.slice(first, first + rows);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full relative overflow-hidden flex flex-row items-start justify-start pb-[29.4px] pr-[18px] box-border gap-[12px] text-left text-xl text-indianred mq450:h-auto">
        <SideBar />
        <div className="flex flex-col justify-start gap-[32px] w-full pt-10 h-full mb-28">
          <Bar />
          <div className="flex flex-row items-center justify-between flex-shrink-0 p-2 mx-6 border-b-2 border-l-2 border-solid rounded-2xl mq450:flex-col mq450:items-start mq450:ml-2">
            <h1 className="text-3xl font-bold">List User</h1>
            <input
              type="text"
              placeholder="Search List User"
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-4 ml-8 mq450:gap-6">
            {paginatedUsers.map((user) => (
              <ProfileCard key={user?.id} user={user} getUser={getUser} />
            ))}
          </div>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={filteredUser.length}
            rowsPerPageOptions={[10, 20, 30]}
            onPageChange={onPageChange}
            className="text-black paginator"
          />

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListUser;
