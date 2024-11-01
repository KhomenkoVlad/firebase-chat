import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchItemType } from "../types";

const initialState: {
  result: SearchItemType[] | null;
} = {
  result: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  selectors: {
    selectResult: state => state.result,
  },
  reducers: {
    setResult: (state, action: PayloadAction<SearchItemType[] | null>) => {
      state.result = action.payload;
    },
    reset: state => {
      state.result = null;
    },
  },
});
