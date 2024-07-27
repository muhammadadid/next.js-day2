import { useState, useEffect } from 'react';
import axios from 'axios';

const SortDropdown = ({ onSortChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('Select');

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
          {
            headers: {
              "content-type": "multipart/form-data",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setCategories(response.data.data);
        console.log("Categories Data:", response.data.data); // Log categories data
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  const handleChange = (event) => {
    const categoryId = event.target.value;
    const categoryName = categories.find(cat => cat.id === categoryId)?.name || 'Select';
    console.log("Dropdown Change - Selected Category ID:", categoryId); // Log selected category ID
    setSelectedCategory(categoryId);
    setSelectedLabel(categoryName);
    onSortChange(categoryId);
  };

  return (
    <div className="relative rounded-[20px] box-border w-56 flex flex-row items-start justify-start pt-1 pb-0.5 pr-[9px] pl-[19px] gap-[8px] leading-[normal] tracking-[normal] text-left text-sm text-neutral-color-60 font-body-14px-medium border-[1px] border-solid border-neutral-color-20 mq450:w-full">
      <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
        <div className="relative leading-[20px] font-medium inline-block min-w-[103px]">
          Sort By
        </div>
      </div>
      <select
        value={selectedCategory}
        onChange={handleChange}
        className="flex-1 bg-transparent border-none text-neutral-color-60 font-body-14px-medium"
      >
        <option value="">Sort By</option>
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))
        ) : (
          <option value="">No categories available</option>
        )}
      </select>
    </div>
  );
};

export default SortDropdown;
