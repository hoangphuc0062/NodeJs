import React, { useEffect, useState, Suspense } from "react";

import { apiGetProducts } from "../../apis/products";

const Product = React.lazy(() => import("../../components/Product"));
const FilterBar = React.lazy(() => import("../../components/FilterBar"));

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await apiGetProducts();
    setProducts(response.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FilterBar />
        <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-4">
          {products &&
            products.map((product) => (
              <Product key={product.id} productData={product} />
            ))}
        </div>
      </Suspense>
    </div>
  );
};

export default Products;
