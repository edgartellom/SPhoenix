import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [
    {
      model: "",
      brand: "",
      price: 0.0,
      image: "",
      launch: "",
      memory: {
        ram: [],
        intern: [],
      },
      color: [],
    },
  ],
  productStatus: "",
};

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productByIdSlice = createSlice({
  name: "productById",
  initialState,
  reducers: {},
  // add cases from status query axios (getProductById)
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.pending, (state, action) => {
        state.productStatus = STATUSES.LOADING;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.productStatus = STATUSES.IDLE;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.productStatus = STATUSES.ERROR;
      });
  },
});

export default productByIdSlice.reducer;

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    const res = await axios.get("/phones/" + id);
    console.log(res.data);
    return res.data[0];
  }
);
