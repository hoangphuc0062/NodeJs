import React, { useEffect, useState, useLayoutEffect } from "react";
import { handleToast } from "../../ultils/toast";
import { handleSlug } from "../../ultils/helper";
import {
  apiGetCategories,
  apiDeleteCategory,
  apiAddCategory,
  apiUpdateCategory,
} from "../../apis/category";
import Button from "../../components/Button";
import icon from "../../ultils/icons";

const { FaEye, FaTrash, GrUpdate } = icon;

const ManagerCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isAddCate, setIsAddCate] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
  });
  const resetPayload = () => {
    setPayload({
      name: "",
    });
  };

  const getAllCategories = async () => {
    const response = await apiGetCategories();
    setCategories(response.categories);
  };
  const handleAdd = async () => {
    const response = await apiAddCategory(payload);
    if (response.success) {
      handleToast("success", response.mes);
      resetPayload();
      setIsAddCate(false);
      getAllCategories();
    } else {
      handleToast("error", response.mes);
    }
  };

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this category ?")) {
      const response = await apiDeleteCategory(_id);
      console.log(response.success);
      if (response.success) {
        handleToast("success", response.mes);
        getAllCategories();
      } else {
        handleToast("error", response.mes);
      }
    }
  };
  const handleCategoryClick = (_id) => {
    setNewCategory(_id);
    setisUpdate(true);
  };

  const handleUpdate = async (category) => {
    const { _id, name } = category;

    const newSlug = handleSlug(name);
    const data = {
      name,
      slug: newSlug,
    };
    const response = await apiUpdateCategory(_id, data);
    if (response.success) {
      handleToast("success", response.mes);
      setisUpdate(false);
      getAllCategories();
    } else {
      handleToast("error", response.mes);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div class="relative h-screen p-2">
      <Button
        name="Add new category"
        handleOnclick={() => setIsAddCate(true)}
      />

      {isAddCate && (
        <div
          class="absolute top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50"
          onClick={() => setIsAddCate(false)}
        >
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 class="text-2xl font-semibold text-center">Add new category</h1>
            <form class="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="Category name"
                class="p-2 border border-gray-200 rounded-md"
                value={payload.name}
                onChange={(e) => setPayload({ name: e.target.value })}
              />
              <Button name="Add Category " handleOnclick={() => handleAdd()} />
            </form>
          </div>
        </div>
      )}
      {isUpdate && (
        <div
          class="absolute top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50"
          onClick={() => setisUpdate(false)}
        >
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 class="text-2xl font-semibold text-center">Update category</h1>
            <form class="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="Category name"
                class="p-2 border border-gray-200 rounded-md"
                value={newCategory?.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
              <Button
                name="Add "
                handleOnclick={() => handleUpdate(newCategory)}
              />
            </form>
          </div>
        </div>
      )}
      <table class="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Category name
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {category?.name}
              </th>
              <td class="flex gap-4 px-6 py-4">
                {/* <span className="p-3 cursor-pointer">
                  <FaEye />
                </span> */}
                <span
                  className="p-3 cursor-pointer"
                  onClick={() => handleDelete(category._id)}
                >
                  <FaTrash />
                </span>
                <span
                  className="p-3 cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                >
                  <GrUpdate />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerCategories;
