import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch products from API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (pageNumber, { rejectWithValue }) => {
    try {
      const limit = 10;
      const skip = (pageNumber - 1) * limit;
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,id`
      );

      if (!response.ok) {
        throw new Error("Network error");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    total: 0,
    loading: false,
    error: null,
    pageNumber: 1,
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPageNumber } = productSlice.actions;
export default productSlice.reducer;
