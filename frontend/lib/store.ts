import myNotesReducer from "@/lib/features/MyNotes/myNotesWrapper/myNotesWrapperSlice";
import filterFieldReducer from "@/lib/features/MyNotes/notes/filterField/filterFieldSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    myNotes: myNotesReducer,
    filter: filterFieldReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
