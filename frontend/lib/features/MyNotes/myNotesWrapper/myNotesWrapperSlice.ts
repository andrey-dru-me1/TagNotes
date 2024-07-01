import NoteView from "@/lib/types/NoteView";
import { createSlice } from "@reduxjs/toolkit";

const MyNotesWrapperSlice = createSlice({
  name: "MyNotesWrapper",
  initialState: {
    noteView: NoteView.Notes,
  },
  reducers: {
    changeNoteView(state, action) {
      state.noteView = action.payload;
    },
  },
});

export const { changeNoteView } = MyNotesWrapperSlice.actions;
export default MyNotesWrapperSlice.reducer;
