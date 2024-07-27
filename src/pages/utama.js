import FoodCard from "@/components/FoodCard";
import axios from "axios";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const res = await axios.get(
    "https://api-bootcamp.do.dibimbing.id/api/v1/foods",
    {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJjYTIzZDdjYy02Njk1LTQzNGItODE2Yy03ZTlhNWMwNGMxNjQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE4NzUzMjF9.wV2OECzC25qNujtyb9YHyzYIbYEV-wud3TQsYv7oB4Q",
      },
    }
  );
  const data = res.data.data;
  console.log(res);
  return { props: { foods: data } };
}

export default function PostDetail({ foods }) {
  const router = useRouter();
  return (
    <div>
      <nav className="w-full py-5 text-3xl text-center bg-green-300">
        <h1>Halaman Utama</h1>
      </nav>
      <div className="p-8">
        <ul className="flex flex-wrap gap-4 spaces-y-2">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </ul>
      </div>
    </div>
  );
}
