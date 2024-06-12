import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputCount } from "../../components";
import {
  apiUpdateCart,
  apiRemoveItem,
  apiUpdateQuantity,
} from "../../apis/user";
import formatNumber from "../../ultils/formatNumber";
import { handleToast } from "../../ultils/toast";
import { Link } from "react-router-dom";
import path from "../../ultils/path";

const Cart = () => {
  const { current } = useSelector((state) => state.user);
  const [cart, setCart] = useState(current?.cart);
  const [subtotal, setSubtotal] = useState(0);

  const handleRemove = async (pid, _id) => {
    if (!current._id) {
      handleToast("error", "User not identified");
      return;
    }
    const response = await apiRemoveItem(current._id, pid);

    if (response.success) {
      handleToast("success", "Item successfully removed from cart");
      const newCart = cart.filter((item) => item._id !== _id);
      setCart(newCart);
      updateSubtotal(newCart);
    } else {
      handleToast("error", response.message || "Failed to remove item");
    }
  };

  const updateSubtotal = (newCart) => {
    let newSubtotal = 0;
    newCart.forEach((item) => {
      newSubtotal += item.price * item.quantity;
    });
    setSubtotal(newSubtotal);
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = cart.map((item, key) => {
      if (key === index) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    updateSubtotal(updatedCart);
  };
  const handleUpdateCart = async () => {
    if (!current._id) {
      return;
    }
    const pids = cart.map((item) => item.pid);
    const quantities = cart.map((item) => item.quantity);
    const response = await apiUpdateQuantity(pids, quantities);
    if (response.success) {
      handleToast("success", "Cart updated successfully");
    } else {
      handleToast("error", response.message || "Failed to update cart");
    }
  };

  useEffect(() => {
    setCart(current?.cart);
    updateSubtotal(current?.cart || []);
  }, [current?.cart]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Shopping Bag</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="text-left">
                  <th className="py-2 px-4 border-b ">Product</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart && cart.length > 0 ? (
                  cart.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b flex items-center">
                        <button
                          className="text-red-500 mr-2"
                          onClick={() => handleRemove(item?.pid, item?._id)}
                        >
                          ×
                        </button>
                        <img
                          src={item?.image}
                          alt="Product Image"
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <span>{item?.name}</span>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {formatNumber(item?.price)}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <InputCount
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(index, parseInt(e.target.value))
                          }
                          onIncrement={() =>
                            updateQuantity(index, item.quantity + 1)
                          }
                          onDecrement={() => {
                            if (item.quantity > 1)
                              updateQuantity(index, item.quantity - 1);
                          }}
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        {formatNumber(item?.price * item?.quantity)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Your cart is empty. Go shopping{" "}
                      <Link
                        to={`/${path.PRODUCTS}`}
                        className="hover:underline"
                      >
                        Now
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex mt-4">
            <button
              className="bg-black text-white px-4 py-2 ml-2"
              onClick={() => handleUpdateCart()}
            >
              Update Cart
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Cart Totals</h2>
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>{formatNumber(subtotal)}</span>
            </div>
            <Link to={`/${path.CHECKOUT}`}>
              <button className="w-full bg-black text-white py-2 mt-4">
                Proceed To Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
