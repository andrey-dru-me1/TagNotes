"use client";

import api from "@/lib/features/api/api";
import FilterField from "@/lib/features/MyNotes/notes/filterField/FilterField";
import NotesView from "@/lib/features/MyNotes/notes/notesView/NotesView";
import OneNoteView from "@/lib/features/MyNotes/notes/oneNoteView/OneNoteView";
import { useAppSelector } from "@/lib/hooks";
import Note from "@/lib/types/Note";
import NoteView from "@/lib/types/NoteView";
import { Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";

interface NotesResponse {
  sorted: Note[];
  old: Note[];
}

export default function NotesComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Note[]>([]);
  const [oldNotes, setOldNotes] = useState<Note[]>([]);
  const noteView = useAppSelector((state) => state.myNotes.noteView);
  const filterTags = useAppSelector((state) => state.filter.filterTags);

  const updateNotes = () => {
    if (filterTags.length > 0) {
      const filterTagIds = filterTags.map((tag) => tag.id);
      api.post<Note[]>("/notes/filter", filterTagIds).then((response) => {
        setIsLoading(false);
        const payload: Note[] = response.data;
        setData(payload);
      });
    } else {
      api.get<NotesResponse>("/notes").then((response) => {
        setIsLoading(false);
        const payload: NotesResponse = response.data;
        setData(payload.sorted);
        setOldNotes(payload.old);
      });
    }
  };

  useEffect(updateNotes, [filterTags]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onAddNoteClick = () => {
    api
      .put("/note", { title: "Untitled", content: "" })
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
      <Stack direction={"row"}>
        <Box>
          <Button onClick={onAddNoteClick}>Add Note</Button>
          {noteView == NoteView.Notes && <NotesView notes={data} />}
          {noteView == NoteView.OneNote && <OneNoteView notes={data} />}
        </Box>
        {oldNotes.length > 0 && (
          <Box>
            Maybe you want to delete old notes:
            <ul>
              {oldNotes.map((note: Note) => (
                <li key={note.id}>
                  <Box
                    onClick={() =>
                      api.delete(`/note/${note.id}`).then(updateNotes)
                    }
                    sx={{ cursor: "pointer" }}
                    color={"red"}
                  >
                    {note.title}
                  </Box>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
