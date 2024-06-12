import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { categories } = useSelector((state) => state.app);
  // const [categories, setCategories] = useState([]);
  // const fetchCategories = async () => {
  //   const response = await apiGetCategories();
  //   setCategories(response.categories);
  // };
  // useEffect(() => {
  //   fetchCategories();
  // }, []);
  return (
    <div className="flex flex-col border">
      {categories?.map((category) => (
        <NavLink
          key={category?.id}
          to={category?.slug}
          className={({ isActive }) =>
            isActive
              ? "bg-main text-while px-5 py-5 text-sm hover:text-semi border"
              : "px-5 py-5 text-sm hover:text-semi border"
          }
        >
          {category?.name}
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
