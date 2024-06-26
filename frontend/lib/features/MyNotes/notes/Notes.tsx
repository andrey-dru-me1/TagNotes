"use client";

import api from "@/lib/features/api/api";
import FilterField from "@/lib/features/MyNotes/notes/filterField/FilterField";
import NotesView from "@/lib/features/MyNotes/notes/notesView/NotesView";
import OneNoteView from "@/lib/features/MyNotes/notes/oneNoteView/OneNoteView";
import { useAppSelector } from "@/lib/hooks";
import Note from "@/lib/types/Note";
import NoteView from "@/lib/types/NoteView";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function NotesComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Note[]>([]);
  const noteView = useAppSelector((state) => state.myNotes.noteView);

  useEffect(() => {
    api.get<Note[]>("/notes").then((response) => {
      setIsLoading(false);
      const payload: Note[] = response.data;
      setData(payload);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onAddNoteClick = () => {
    api
      .post("/note", { title: "Untitled", content: "" })
      .then((response) => {
        console.log(response);
        const note: Note = response.data;
        window.location.href = `/note/${note.id}`;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box padding={2}>
      <FilterField />
      {noteView == NoteView.Notes && <NotesView notes={data} />}
      {noteView == NoteView.OneNote && <OneNoteView notes={data} />}
      <Button onClick={onAddNoteClick}>Add Note</Button>
    </Box>
  );
}
