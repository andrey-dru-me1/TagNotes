"use client";

import api from "@/lib/features/api/api";
import NotesView from "@/lib/features/notes/notesView/NotesView";
import OneNoteView from "@/lib/features/notes/oneNoteView/OneNoteView";
import Note from "@/lib/types/Note";
import NoteView from "@/lib/types/NoteView";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function NotesComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Note[]>([]);
  const [view, setView] = useState<NoteView>(NoteView.Notes);

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

  const handleChange = (event: SelectChangeEvent<NoteView>) => {
    const {
      target: { value },
    } = event;
    if (typeof value !== "string") {
      setView(value);
    }
  };

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
      <Select onChange={handleChange} value={view}>
        <MenuItem value={NoteView.Notes}>Notes</MenuItem>
        <MenuItem value={NoteView.OneNote}>OneNote</MenuItem>
      </Select>
      {view == NoteView.Notes && <NotesView notes={data} />}
      {view == NoteView.OneNote && <OneNoteView notes={data} />}
      <Button onClick={onAddNoteClick}>Add Note</Button>
    </Box>
  );
}
