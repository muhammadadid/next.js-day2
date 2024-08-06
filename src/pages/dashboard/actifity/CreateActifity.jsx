// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useRouter } from "next/router";
// import SideBar from "@/components/SideBar";
// import Footer from "@/components/Footer";
// import Bar from "@/components/dashboard/Bar";

// const CreateActivity = () => {
//   const router = useRouter();
//   const [file, setFile] = useState(null);
//   const [imageUrls, setImageUrls] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     categoryId: "",
//     description: "",
//     price: "",
//     price_discount: "",
//     rating: "",
//     total_reviews: "",
//     facilities: "",
//     address: "",
//     province: "",
//     city: "",
//     location_maps: "",
//   });

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
//           {
//             headers: {
//               apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             },
//           }
//         );
//         setCategories(response.data.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         toast.error("Failed to load categories");
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       ...formData,
//       price: parseInt(formData.price),
//       imageUrls: imageUrls, // Ensure this is included
//     };

//     console.log("Payload:", payload);

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk5MDg1NzZ9.ao6_vk2T5Ia3Ez9ezF-T9q0PKOGv7XaIvdh_guEf_os",
//       },
//     };
//     try {
//       const response = await axios.post(
//         "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity",
//         payload,
//         config
//       );
//       if (response.status === 200) {
//         toast.success("Activity created successfully");
//         console.log(response.data.data);
//         setImageUrls([]);
//       } else {
//         console.log(response.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     setTimeout(() => {
//       router.push("/dashboard/actifity/Actifity");
//     }, 2000);
//   };

//   const handleUpload = async () => {
//     const uploadData = new FormData();
//     uploadData.append("image", file);

//     const config = {
//       headers: {
//         "content-type": "multipart/form-data",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
//         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//       },
//     };

//     try {
//       const res = await axios.post(
//         "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
//         uploadData,
//         config
//       );
//       console.log("Image upload response:", res.data);
//       setImageUrls((prevUrls) => [...prevUrls, res.data.url]);
//       toast.success("Image uploaded successfully!");
//     } catch (error) {
//       toast.error("Failed to upload image!");
//       console.log("Image upload error:", error);
//     }
//   };

//   const handleOnChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   return (
//     <div className="w-full h-full bg-lightyellow">
//       <div className="w-full h-full relative overflow-hidden flex flex-row items-start justify-start pb-[29.4px] pr-[18px] box-border gap-[12px] text-left text-xl text-indianred mq450:h-auto">
//         <SideBar />
//         <div className="flex flex-col items-start justify-start flex-1 ">
//           <div className="self-stretch flex flex-col justify-start gap-[12px] max-w-full pl-2 pt-12 pb-28">
//             <Bar />
//             <div className="w-full max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
//               <h1 className="mb-6 text-2xl font-bold text-center ">
//                 Create Activity
//               </h1>
//               {imageUrls.map((url, index) => (
//                 <img
//                   key={index}
//                   src={url}
//                   alt="Activity Image"
//                   className="object-cover w-full mx-auto mb-6 rounded shadow-md h-80"
//                 />
//               ))}
//               <form className="space-y-4" onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Title
//                     </label>
//                     <input
//                       type="text"
//                       id="title"
//                       name="title"
//                       onChange={handleOnChange}
//                       className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Image Files
//                     </label>
//                     <input
//                       type="file"
//                       id="image"
//                       onChange={handleFileChange}
//                       className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleUpload}
//                       className="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700"
//                     >
//                       Upload Image
//                     </button>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Category
//                     </label>
//                     <select
//                       id="categoryId"
//                       name="categoryId"
//                       onChange={handleOnChange}
//                       className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     >
//                       <option value="">Select</option>
//                       {categories.map((category) => (
//                         <option key={category.id} value={category.id}>
//                           {category.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Description
//                     </label>
//                     <textarea
//                       id="description"
//                       name="description"
//                       onChange={handleOnChange}
//                       className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     ></textarea>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Price
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       onChange={handleOnChange}
//                       id="price"
//                       className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Price Discount
//                     </label>
//                     <input
//                       type="text"
//                       name="price_discount"
//                       id="price-discount"
//                       onChange={handleOnChange}
//                       className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Rating
//                     </label>
//                     <input
//                       type="text"
//                       id="rating"
//                       name="rating"
//                       onChange={handleOnChange}
//                       className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Total Review
//                     </label>
//                     <input
//                       type="text"
//                       id="total-review"
//                       name="total_reviews"
//                       onChange={handleOnChange}
//                       className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Facilities
//                     </label>
//                     <input
//                       type="text"
//                       id="facilities"
//                       name="facilities"
//                       onChange={handleOnChange}
//                       className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Address
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       name="address"
//                       onChange={handleOnChange}
//                       className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Province
//                     </label>
//                     <input
//                       type="text"
//                       id="province"
//                       name="province"
//                       onChange={handleOnChange}
//                       className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       id="city"
//                       name="city"
//                       onChange={handleOnChange}
//                       className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Location Maps
//                     </label>
//                     <input
//                       type="text"
//                       id="location_maps"
//                       name="location_maps"
//                       onChange={handleOnChange}
//                       className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-between">
//                   <button
//                     type="submit"
//                     className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-700"
//                   >
//                     Create Activity
//                   </button>
//                   <button className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-red-700 rounded-md hover:bg-red-900">
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CreateActivity;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";
import Bar from "@/components/dashboard/Bar";
import { Rating } from "primereact/rating";

const CreateActivity = () => {
  const router = useRouter();
  const toastRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    description: "",
    price: "",
    price_discount: "",
    rating: "",
    total_reviews: "",
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
  });

  const toast = useRef(null);
 

  const validateStep1 = () => {
    const { title, categoryId } = formData;
    if (!title || !categoryId) {
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: "All fields are required!",
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const {
      description,
      facilities,
      rating,
      total_reviews,
      price_discount,
      price,
    } = formData;
    if (
      !description ||
      !facilities ||
      !rating ||
      !total_reviews ||
      !price_discount ||
      !price
    ) {
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: "All fields are required!",
      });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const { address, province, city, location_maps } = formData;
    if (!address || !province || !city || !location_maps) {
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: "All fields are required!",
      });
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    const { imageUrls } = formData;
    if (!imageUrls) {
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: "Image is required!",
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseInt(formData.price),
      imageUrls: imageUrls, // Ensure this is included
    };

    console.log("Payload:", payload);

    const config = {
      headers: {
        "Content-Type": "application/json",
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk5MDg1NzZ9.ao6_vk2T5Ia3Ez9ezF-T9q0PKOGv7XaIvdh_guEf_os",
      },
    };
    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity",
        payload,
        config
      );
      toast.current.show({
        severity: "success",
        summary: "Promo Created",
        detail: "Promo created successfully!",
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to create promo!",
      });
      console.log(error);
    }
    setTimeout(() => {
      router.push("/dashboard/actifity/Actifity");
    }, 2000);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append("image", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    };

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        uploadData,
        config
      );
      console.log("Image upload response:", res.data);
      setImageUrls((prevUrls) => [...prevUrls, res.data.url]);
      toast.current.show({
        severity: "success",
        summary: "Image Uploaded",
        detail: "Image uploaded successfully!",
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to upload image!",
      });
      console.log("Image upload error:", error);
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const goToNextStep = () => {
    let isValid = false;

    switch (activeIndex) {
      case 0:
        isValid = validateStep1();
        break;
      case 1:
        isValid = validateStep2();
        break;
      case 2:
        isValid = validateStep3();
        break;
      case 3:
        isValid = validateStep4();
        break;
      default:
        isValid = true;
        break;
    }

    if (isValid) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };
  const prevStep = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
  };

  const items = [
    {
      label: "Basic Information",
      command: () => {
        toastRef.current.show({
          severity: "info",
          summary: "First Step",
          detail: "Basic Information",
        });
      },
    },
    {
      label: "Details",
      command: () => {
        toastRef.current.show({
          severity: "info",
          summary: "Second Step",
          detail: "Details",
        });
      },
    },
    {
      label: "Address",
      command: () => {
        toastRef.current.show({
          severity: "info",
          summary: "Third Step",
          detail: "Address",
        });
      },
    },
    {
      label: "Image Upload",
      command: () => {
        toastRef.current.show({
          severity: "info",
          summary: "Last Step",
          detail: "Image Upload",
        });
      },
    },
  ];

  return (
    <div className="w-full h-full bg-lightyellow">
      <Toast ref={toast} />
      <div className="w-full h-full relative overflow-hidden flex flex-row items-start justify-start pb-[29.4px] pr-[18px] box-border gap-[12px] text-left text-xl text-indianred mq450:h-auto">
        <SideBar />
        <div className="flex flex-col items-start justify-start flex-1 ">
          <div className="self-stretch flex flex-col justify-start gap-[12px] max-w-full pl-2 pt-12 pb-28">
            <Bar />
            <div className="w-full max-w-4xl p-8 mx-auto bg-white shadow-md rounded-xl">
              <h1 className="mb-6 text-2xl font-bold text-center ">
                Create Activity
              </h1>
              
              <Steps
                model={items}
                activeIndex={activeIndex}
                onSelect={(e) => setActiveIndex(e.index)}
                readOnly={false}
                className="mq450:hidden"
              />
              <form
                className="mt-4 space-y-4 mq450:pt-6"
                onSubmit={handleSubmit}
              >
                {activeIndex === 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-xl"
                      >
                        <option value="">Select</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                {activeIndex === 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-xl"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price Discount
                      </label>
                      <input
                        type="number"
                        id="price_discount"
                        name="price_discount"
                        value={formData.price_discount}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block pb-2 text-sm font-medium text-gray-700">
                        Rating
                      </label>
                      <Rating
                        value={formData.rating}
                        
                        onChange={(e) =>
                          setFormData({ ...formData, rating: e.value })
                        }
                        cancel={false}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Total Reviews
                      </label>
                      <input
                        type="number"
                        id="total_reviews"
                        value={formData.total_reviews}
                        name="total_reviews"
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Facilities
                      </label>
                      <input
                        type="text"
                        id="facilities"
                        name="facilities"
                        value={formData.facilities}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-xl"
                      />
                    </div>
                  </div>
                )}
                {activeIndex === 2 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Province
                      </label>
                      <input
                        type="text"
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Location Maps
                      </label>
                      <input
                        type="text"
                        id="location_maps"
                        name="location_maps"
                        value={formData.location_maps}
                        onChange={handleOnChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-xl"
                      />
                    </div>
                  </div>
                )}
                {activeIndex === 3 && (
                  <div className="w-full mb-4">
                  {imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="Activity Image"
                  className="object-cover w-full mx-auto mb-6 rounded shadow-md h-80"
                />
              ))}
                  <label
                    htmlFor="image"
                    className="block mb-4 font-bold text-gray-700"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="imageUrls"
                    name="imageUrls"
                    value={formData.imageUrls}
                    onChange={handleUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  ></input>
                </div>
                )}
                <div className="flex justify-between mt-4">
                  {activeIndex > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 text-white bg-gray-600 rounded-xl"
                    >
                      Previous
                    </button>
                  )}
                  {activeIndex < items.length - 1 && (
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="px-4 py-2 text-white bg-blue-600 rounded-xl"
                    >
                      Next
                    </button>
                  )}
                  {activeIndex === items.length - 1 && (
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-green-600 rounded-md"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateActivity;
