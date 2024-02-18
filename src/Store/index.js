import { configureStore } from "@reduxjs/toolkit";
import TaskListSlice from "./slice/TaskListSlice";
const store = configureStore({
  reducer: {
    // fromData: FormSlice,
    // pageNo : pageNoSlice,
    // FromErrorSlice: FromErrorSlice,
    TaskManager: TaskListSlice,
    // reducer2:reducrer
  },
});

export default store;
