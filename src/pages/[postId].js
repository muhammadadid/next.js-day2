import axios from "axios";
import postDetail from ".";

export async function getServerSideProps({ context }) {
  const resp = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${context.query.postId}`
  );
  return { props: { postDetail: resp.data } };
}
export default function Post({ menus }) {
  return <div>{menus.title}</div>;
}
