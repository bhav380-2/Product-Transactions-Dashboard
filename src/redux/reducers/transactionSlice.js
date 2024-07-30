import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const INITIAL_STATE={
  transactions: [],
  statistics: {},
  barChartData: [],
  loading: false,
  error: null,
}

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({ month, search, page }) => {
    console.log("Hiieiei");
    const response = await axios.get(`http://localhost:8000/transactions`, {
      params: { month, search, page }
    });

    console.log(response.data.content.data)
    return response.data.content.data;
  }
);

export const fetchStatistics = createAsyncThunk(
  'transactions/fetchStatistics',
  async (month) => {
    const response = await axios.get(`http://localhost:8000/transactions/stats`, { params: { month } });
    return response.data.content.data;
  }
);

export const fetchBarChartData = createAsyncThunk(
  'transactions/fetchBarChartData',
  async (month) => {

    console.log("bar asyncthunk");
    const response = await axios.get(`http://localhost:8000/transactions/barchart`, { params: { month } });
        console.log(response.data)
    return response.data.content.data;
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBarChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBarChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.barChartData = action.payload;
      })
      .addCase(fetchBarChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const transactionActions = transactionsSlice.actions;
export const transactionReducer = transactionsSlice.reducer;
export const transactionSelector = (state) => state.transactionReducer