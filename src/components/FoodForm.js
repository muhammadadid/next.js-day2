import axios from "axios";

export default function FoodForm({ defaultFormData, isEdit }) {
  const router = useRouter();
  const [formData, setFormData] = useState(defaultFormData);
  const onSubmit = async (e) => {
    e.preventDefault();
    const urlEdit = `https://api-bootcamp.do.dibimbing.id/api/v1/create-food/${router.query.id}`;
    const urlCreate = `https://api-bootcamp.do.dibimbing.id/api/v1/create-food`;
    const resp = await axios.post(
      isEdit ? urlEdit : urlCreate,
      {
        name: formData.name,
        imageUrl: formData.imageUrl,
        descreption: " ",
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
    if (resp.data.code === "200") {
      router.push("/");
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      />
      <button type="submit">{isEdit ? "Update" : "Create"}</button>
    </form>
  );
}
