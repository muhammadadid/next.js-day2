import { useState } from "react";
import axios from "axios";

export default function Create() {
  const [fromData, setFromData] = useState({ name: "", imageUrl: "" });
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://api-bootcamp.do.dibimbing.id/api/v1/create-food",

      {
        name: fromData.name,
        imageUrl: fromData.imageUrl,
        description: "",
        ingredients: [],
      },
      {
        headers: {
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJjYTIzZDdjYy02Njk1LTQzNGItODE2Yy03ZTlhNWMwNGMxNjQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE4NzUzMjF9.wV2OECzC25qNujtyb9YHyzYIbYEV-wud3TQsYv7oB4Q",
        },
      }
    );

    if (res.data.code === "200") alert("makanan berhasil ditambahkan");
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Buat Makanan Baru</h1>
      <input 
      className="text-black"
        onChange={(e) => setFromData({ ...fromData, name: e.target.value })}
        placeholder="masukkan nama makanan"
      />
      <input
      className="text-black"
        onChange={(e) => setFromData({ ...fromData, imageUrl: e.target.value })}
        placeholder="masukkan url gambar"
      />
      <button type="submit" className="p-2 bg-blue-800 rounded">
        Tambah makanan
      </button>
    </form>
  );
}