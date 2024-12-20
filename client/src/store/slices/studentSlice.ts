import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Student } from "../../types";

const initialState = {
  students: [
    {
      id: "1",
      name: "John Doe",
      cohort: "Paid",
      courses: ["Credit Card", "Banking"],
      dateJoined: "2023-01-01",
      lastLogin: "2023-01-01",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Doe",
      cohort: "Free",
      courses: ["Banking", "Investments"],
      dateJoined: "2023-01-02",
      lastLogin: "2023-01-02",
      status: "inactive",
    },
    {
      id: "3",
      name: "Bob Smith",
      cohort: "Paid",
      courses: ["Credit Card", "Banking"],
      dateJoined: "2023-01-03",
      lastLogin: "2023-01-03",
      status: "active",
    },
    {
      id: "4",
      name: "Alice Johnson",
      cohort: "Free",
      courses: ["Banking", "Investments"],
      dateJoined: "2023-01-04",
      lastLogin: "2023-01-04",
      status: "inactive",
    },
  ] as Student[],
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
