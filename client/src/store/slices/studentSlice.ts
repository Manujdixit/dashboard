import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Student } from "../../types";

const initialState = {
  students: [] as Student[],
  loading: false,
  error: null as string | null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload);
    },
    setStudents: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
    },
  },
});

export const { addStudent, setStudents } = studentSlice.actions;

export default studentSlice.reducer;
