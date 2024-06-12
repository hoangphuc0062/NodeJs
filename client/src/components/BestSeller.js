import React, { useState, useEffect } from "react";
import Product from "./Product";
import apiGetProducts from "../apis/products";
import Slider from "react-slick";

const tabs = [
  { id: 1, name: "Best Seller" },
  { id: 2, name: "New Arrival" },
  { id: 3, name: "Comming soon" },
];

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const BestSeller = () => {
  const [products, setProducts] = useState();
  const [bestSeller, setBestSeller] = useState();
  const [newArrival, setNewArrival] = useState();
  const [activeTab, setActiveTab] = useState(1);

  const fetchProduct = async () => {
    try {
      const response = await apiGetProducts();

      if (response && response.products) {
        const newArrivals = response.products.filter(
          (product) => product.type === "New Arrival"
        );
        const bestSellers = response.products.filter(
          (product) => product.type === "Best Seller"
        );
        setNewArrival(newArrivals);
        setProducts(newArrivals);
        setBestSeller(bestSellers);
        setProducts(bestSellers);
      } else {
        console.error("No products found in response");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  useEffect(() => {
    if (activeTab === 1) setProducts(bestSeller);
    if (activeTab === 2) setProducts(newArrival);
  }, [activeTab, bestSeller, newArrival]);
  return (
    <div>
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-semi cursor-pointer">
        {tabs?.map((tab) => (
          <div
            key={tab.id}
            className={
              activeTab === tab.id
                ? "text-main p-2 border-b-2 border-semi transition-all delay-100"
                : "text-gray-500 p-2"
            }
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="mb-4 gap-4">
        <Slider {...settings}>
          {products?.map((product) => (
            <Product key={product} productData={product} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSeller;
