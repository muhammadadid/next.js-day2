
import axios from "axios";
import { useRouter } from "next/router";
export async function getServerSideProps(contex) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${contex.query.page}&_limit=20`
  );
  const data = res.data;
  console.log(res);
  return { props: { postDetail: data } };
}
export default function PostDetail({ postDetail }) {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  return (
    <div>
      <ul className="list-disc list-inside">
        {postDetail.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <h1>{postDetail.title}</h1>
      <button
        className="p-2 bg-blue-800 rounded"
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
}