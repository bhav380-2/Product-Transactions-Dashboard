import { configureStore } from '@reduxjs/toolkit';
import {transactionReducer} from './redux/reducers/transactionSlice';

export const store = configureStore({
  reducer: {
    transactionReducer
  },
});

export default store;
