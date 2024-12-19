import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Class } from "../../types";

const classSlice = createSlice({
  name: "classes",
  initialState: {
    classes: [] as Class[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    addClass: (state, action: PayloadAction<Class>) => {
      state.classes.push(action.payload);
    },
    setClasses: (state, action: PayloadAction<Class[]>) => {
      state.classes = action.payload;
    },
  },
});

export const { addClass, setClasses } = classSlice.actions;

export default classSlice.reducer;
