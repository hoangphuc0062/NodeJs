import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct, apiUpdateCart } from "../../apis";
import formatNumber from "../../ultils/formatNumber";
import { useSelector } from "react-redux";
import { handleToast } from "../../ultils/toast";

const DetailProduct = () => {
  const { pid } = useParams();

  const [singleProduct, setSingleProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(35);
  const { current } = useSelector((state) => state.user);

  const getProduct = async () => {
    const response = await apiGetProduct(pid);
    setSingleProduct(response.product);
  };

  const handleAddToCart = (pid) => async () => {
    const response = await apiUpdateCart(current._id, {
      pid,
      quantity,
      color: singleProduct.color,
      size,
    });
    if (response.success) handleToast("success", "Success add to cart");
  };
  useEffect(() => {
    // console.log(current._id);
    getProduct();
  }, []);
  return (
    <div className="container mx-auto p-4">
      {/* breakcum */}
      {/* <nav className="text-sm mb-4">
        <a href="#" className="text-zinc-500 hover:text-black">
          Giày
        </a>{" "}
        /
        <a href="#" className="text-zinc-500 hover:text-black">
          Vintas
        </a>{" "}
        /<span className="text-black">Vintas Public 2000s - Low Top</span>
      </nav> */}

      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/4">
          {singleProduct?.images && singleProduct?.images[0] && (
            <img
              key={0}
              src={singleProduct.images[0]}
              alt={`Product Image 1`}
              className="w-full mb-4"
            />
          )}

          <div className="flex space-x-2">
            {singleProduct?.images &&
              singleProduct?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="w-20 h-20"
                />
              ))}
          </div>
        </div>
        <div className="md:w-2/4 md:pl-8">
          <h1 className="text-2xl font-bold mb-2">{singleProduct?.name}</h1>
          <p className="text-zinc-600 mb-2">
            Mã sản phẩm: <span className="font-bold">AV00207</span>
          </p>
          <p className="text-red-500 text-xl font-bold mb-4">
            {formatNumber(singleProduct?.price)}
          </p>
          <div className="flex items-center mb-4">
            <span className="mr-2">SIZE</span>
            <select
              className="border border-zinc-300 p-2 rounded"
              onChange={(e) => setSize(e.target.value)}
              value="Choose size"
            >
              <option>35</option>
              <option>36</option>
              <option>37</option>
              <option>38</option>
              <option>39</option>
              <option>40</option>
              <option>41</option>
              <option>42</option>
              <option>43</option>
              <option>44</option>
              <option>45</option>
              <option>46</option>
            </select>
          </div>
          <div className="flex items-center mb-4">
            <span className="mr-2">QUANTITY</span>
            <select
              className="border border-zinc-300 p-2 rounded"
              onChange={(e) => setQuantity(e.target.value)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="flex space-x-2 mb-4">
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={handleAddToCart(singleProduct?._id)}
            >
              ADD TO CART
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              CHECK OUT
            </button>
          </div>
          <div className="border-t border-zinc-300 pt-4">
            {singleProduct?.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
