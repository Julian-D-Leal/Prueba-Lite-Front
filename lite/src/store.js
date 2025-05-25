import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import companyReducer from "./features/user/companySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
  },
});

export default store;