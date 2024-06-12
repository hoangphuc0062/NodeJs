import React, { useState } from "react";
import formatNumber from "../ultils/formatNumber";
// import label from "../assets/label.png";
import SelectOption from "./SelectOption";
import icon from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";

const { FaEye, FaHeart, BsCartPlusFill } = icon;

const Product = ({ productData }) => {
  const [isShowOption, setIsShowOption] = useState(false);

  return (
    <div
      className="w-[95%] m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:border-semi transition-all delay-100 "
      onMouseEnter={(e) => {
        e.stopPropagation();
        setIsShowOption(true);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setIsShowOption(false);
      }}
    >
      <Link to={`/${path?.PRODUCTS}/detail-product/${productData?._id}`}>
        <div className="w-full relative ">
          {isShowOption && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-3 animate-slide-top">
              <SelectOption icon={<FaEye />} />
              <SelectOption icon={<FaHeart />} />
              <SelectOption icon={<BsCartPlusFill />} />
            </div>
          )}
          <img
            className="w-full object-contain rounded"
            src={
              productData.images[0] ||
              "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
            }
            alt={productData.name}
          />
          {/* <img
            src={label}
            alt=""
            className="absolute top-0 left-0 h-[50px] w-[75px]"
          /> */}
          {productData.type && (
            <div className="absolute rounded top-2 left-2 bg-semi text-white px-2 py-2 w-[40%] flex items-center">
              {productData.type}
            </div>
          )}
        </div>
      </Link>
      <div className="px-5 pb-5">
        <a href="/">
          <h5 className="line-clamp-1 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {productData.name}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            {/* Repeat the above SVG as needed */}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            5.0
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-bold text-gray-900 dark:text-white">
            {formatNumber(productData.price)}
          </span>
          <a
            href="/"
            className="text-white bg-semi hover:bg-dark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default Product;
