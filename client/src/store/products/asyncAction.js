import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiGetProducts } from "../../apis/products";

// Define the async action
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await apiGetProducts();
    return response.data;
  }
);
