import myNotesReducer from "@/lib/features/MyNotes/myNotesWrapper/myNotesWrapperSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    myNotes: myNotesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
