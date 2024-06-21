"use client";

import api from "@/lib/features/api/api";
import TagAppender from "@/lib/features/noteEditor/TagAppender";
import Note from "@/lib/interfaces/Note";
import { Box, Button, Divider, Link, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function NoteEditorComponent({ noteId }: { noteId: number }) {
  const [note, setNote] = useState<Note | null>(null);
  useEffect(() => {
    api.get(`/note/${noteId}`).then((response) => {
      const payload = response.data;
      setNote(payload);
    });
  }, []);

  const onTitleChange = (event: { target: { value: string } }) => {
    if (note) {
      setNote({ ...note, title: event.target.value });
    }
  };

  const onContentChange = (event: { target: { value: string } }) => {
    if (note) {
      setNote({ ...note, content: event.target.value });
    }
  };

  const onSaveClick = () => {
    console.log("Clicked");
    if (note) {
      api
        .post(`/note/${noteId}`, note, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response);
        });
    } else {
      console.log(note);
    }
  };

  return (
    <Box>
      <Link href={"/notes"}>Back</Link>
      <Stack
        margin={2}
        padding={2}
        direction={"row"}
        sx={{ borderRadius: 8, border: 4 }}
      >
        <Box width={700} margin={2}>
          <TextField
            fullWidth
            defaultValue={note?.title}
            onChange={onTitleChange}
          />
          <TextField
            multiline
            fullWidth
            defaultValue={note?.content}
            onChange={onContentChange}
          />
          <Button variant={"outlined"} onClick={onSaveClick}>
            Save
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem />
        {note !== null && <TagAppender note={note} />}
      </Stack>
    </Box>
  );
}
