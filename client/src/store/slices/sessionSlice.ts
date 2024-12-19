import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Session } from "../../types";

const sessionSlice = createSlice({
  name: "sessions",
  initialState: {
    sessions: [] as Session[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    addSession: (state, action: PayloadAction<Session>) => {
      state.sessions.push(action.payload);
    },
    setSessions: (state, action: PayloadAction<Session[]>) => {
      state.sessions = action.payload;
    },
  },
});

export const { addSession, setSessions } = sessionSlice.actions;

export default sessionSlice.reducer;
