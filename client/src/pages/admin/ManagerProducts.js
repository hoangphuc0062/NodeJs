import React, { useEffect, useState } from "react";
import { handleToast } from "../../ultils/toast";
import Button from "../../components/Button";
import icon from "../../ultils/icons";
import { apiGetProducts, apiDeleteProduct } from "../../apis/products";
import { Link, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
const { FaEye, FaTrash, GrUpdate } = icon;

const ManagerProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    images: [],
  });

  const getAllProducts = async () => {
    const response = await apiGetProducts();
    setProducts(response.products);
  };

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      const response = await apiDeleteProduct(_id);
      if (response.success) {
        handleToast("success", response.mes);
        getAllProducts();
      } else {
        handleToast("error", response.mes);
      }
    } else {
      handleToast("info", "Deletion cancelled.");
    }
  };
  const handleUserClick = (pid) => {
    const product = products.find((item) => item._id == pid);
    navigate(`/${path.ADMIN}/${path.MANAGER_PRODUCTS}/edit/${pid}`, {
      state: { product },
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div class="relative h-screen p-2">
      <Link
        to={`/${path.ADMIN}/${path.MANAGER_PRODUCTS}/create`}
        className="p-2 bg-black text-white rounded-lg"
      >
        Add a product
      </Link>
      <table class="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Product Name
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              Category
            </th>
            <th scope="col" class="px-6 py-3">
              On Stock
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
              <th
                scope="row"
                class="flex items-center gap-3 px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                <img
                  src={product?.images[0]}
                  alt={product?.name}
                  className="w-[50px] h-[50px]"
                />
                {product?.name}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {product?.price}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {product?.category?.name}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {product?.stock}
              </th>
              <th scope="row" class="flex gap-4 px-6 py-4">
                <span className="p-3 cursor-pointer">
                  <FaEye />
                </span>
                <span
                  className="p-3 cursor-pointer"
                  onClick={() => handleDelete(product._id)}
                >
                  <FaTrash />
                </span>
                <span
                  className="p-3 cursor-pointer"
                  onClick={() => handleUserClick(product._id)}
                >
                  <GrUpdate />
                </span>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerProducts;
