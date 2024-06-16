import axios from "axios";
import { Router } from "next/router";

import { useState } from "react";
export default function CreateFood() {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.post(
      "https://api-bootcamp.do.dibimbing.id/api/v1/create-food",
      {
        name: formData.name,
        imageUrl: formData.imageUrl,
        descreption: "",
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
    if (resp.data.code === "200") Router.push("/");
    console.log(formData);
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Create Food</h1>
      <input
        className="text-black"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        type="text"
        placeholder="Name"
      />
      <input
        className="text-black"
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        type="text"
        name="imageUrl"
        placeholder="masukkan url gambar"
      />
      <button type="submit " onClick={onSubmit}>
        Create
      </button>
    </form>
  );
}
