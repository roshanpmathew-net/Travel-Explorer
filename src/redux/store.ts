import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./LangSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});