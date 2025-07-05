import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  count: number;
  currentIndex: number;
}

const initialState: InitialState = {
  count: 0,
  currentIndex: 1
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setIndex: (state, action: PayloadAction<number>) => {
        state.currentIndex = action.payload;
    }
  },
});

export const bookReducer = bookSlice.reducer;
export const { setState, setIndex } = bookSlice.actions;