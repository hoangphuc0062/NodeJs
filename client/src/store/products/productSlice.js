import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "./asyncAction";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.product = action.payload; // Assuming 'products' is the correct state field.
    });

    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = "failed";
      // state.error = error.message;
    });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
