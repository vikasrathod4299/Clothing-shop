import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    ordersList: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getOrdersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrdersSuccess: (state, action) => {
      state.isFetching = false;
      state.ordersList = action.payload;
    },
    getOrdersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

  },
});

export const {
  getOrdersStart,
  getOrdersSuccess,
  getOrdersFailure,

} = ordersSlice.actions;

export default ordersSlice.reducer;