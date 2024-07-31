import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const INITIAL_STATE = {
  transactions: [],
  statistics: {},
  barChartData: [],
  loading: true,
  error: null,
}

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({ month, search, page }) => {
    const response = await axios.get(`http://localhost:8000/transactions`, {
      params: { month, search, page }
    });
    // console.log("transaction thunk compleete")
    return response.data.content;
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

    // console.log("bar asyncthunk");
    const response = await axios.get(`http://localhost:8000/transactions/barchart`, { params: { month } });
    // console.log(response.data)
    return response.data.content.data;
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {

        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchStatistics.fulfilled, (state, action) => {

        state.statistics = action.payload;
        state.error = null;
      })

      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchBarChartData.fulfilled, (state, action) => {

        state.barChartData = action.payload;
        state.loading = false;
        state.error = null;
      })

      .addCase(fetchBarChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
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