"use client";

import api from "@/lib/features/api/api";
import EditNote from "@/lib/features/MyNotes/noteEditor/EditNote";
import TagAppender from "@/lib/features/MyNotes/noteEditor/TagAppender";
import Note from "@/lib/types/Note";
import { Box, Divider, Link, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function NoteEditor({ noteId }: { noteId: number }) {
  const [note, setNote] = useState<Note | null>(null);
  useEffect(() => {
    api.get(`/note/${noteId}`).then((response) => {
      const payload = response.data;
      setNote(payload);
    });
  }, []);

  return (
    <Box>
      <Link href={"/notes"}>Back</Link>
      <Stack
        margin={2}
        padding={2}
        direction={"row"}
        sx={{ borderRadius: 8, border: 4 }}
      >
        {note && <EditNote note={note} setNote={setNote} />}
        <Divider orientation="vertical" flexItem />
        {note && <TagAppender note={note} />}
      </Stack>
    </Box>
  );
}
