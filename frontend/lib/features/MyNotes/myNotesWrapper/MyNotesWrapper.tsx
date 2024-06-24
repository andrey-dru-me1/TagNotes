"use client";

import { changeNoteView } from "@/lib/features/MyNotes/myNotesWrapper/myNotesWrapperSlice";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import NoteView from "@/lib/types/NoteView";
import { FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

export default function MyNotesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const noteView = useAppSelector((state: RootState) => state.myNotes.noteView);
  const dispatch = useDispatch();

  return (
    <Stack direction={"row"}>
      <RadioGroup value={noteView}>
        <FormControlLabel
          value={NoteView.Notes}
          control={<Radio />}
          label="Notes"
          onClick={() => dispatch(changeNoteView(NoteView.Notes))}
        ></FormControlLabel>
        <FormControlLabel
          value={NoteView.OneNote}
          control={<Radio />}
          label="One Note"
          onClick={() => dispatch(changeNoteView(NoteView.OneNote))}
        ></FormControlLabel>
      </RadioGroup>
      {children}
    </Stack>
  );
}
