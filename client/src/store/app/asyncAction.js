import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";
import { apiDeleteCategory, apiUpdateCategory } from "../../apis/category";

export const getCategories = createAsyncThunk(
  "app/categories",
  async (data, rejectWithValue) => {
    const response = await apis.apiGetCategories();

    if (!response.success) return rejectWithValue(response);
    return response.categories;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await apiDeleteCategory(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ _id, data }) => {
    const response = await apiUpdateCategory(_id, data);
    return response.data;
  }
);
