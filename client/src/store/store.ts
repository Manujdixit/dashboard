import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slices/studentSlice";
import classReducer from "./slices/classSlice";
import sessionReducer from "./slices/sessionSlice";

export const store = configureStore({
  reducer: {
    students: studentReducer,
    classes: classReducer,
    sessions: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
