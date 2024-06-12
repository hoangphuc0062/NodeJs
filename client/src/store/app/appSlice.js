import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: [], // Initialize as an empty array for better handling of mapping operations
    isLoading: false,
    errorMessage: "", // Initialize error message for better error handling
  },
  reducers: {},

  extraReducers: (builder) => {
    // Handling getCategories action
    builder
      .addCase(actions.getCategories.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(actions.getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(actions.getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          action.error.message || "Failed to fetch categories";
      });

    // Handling deleteCategory action
    builder
      .addCase(actions.deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.categories = state.categories.filter(
            (category) => category._id !== action.payload._id
          );
        }
      })
      .addCase(actions.deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          action.error.message || "Failed to delete category";
      });

    // Handling updateCategory action
    builder
      .addCase(actions.updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.categories.findIndex(
          (category) => category._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(actions.updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          action.error.message || "Failed to update category";
      });
  },
});

export const {} = appSlice.actions;

export default appSlice.reducer;
