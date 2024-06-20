"use client";

import TagAppender from "@/lib/features/tagAppender/TagAppender";
import { Box, Button, Link, Modal, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function NoteEdit({
  params: { noteId },
}: {
  params: { noteId: number };
}) {
  const [note, setNote] = useState<Note | null>(null);
  const [tagsModalOpen, setTagsModalOpen] = useState(false);

  const handleTagsModalOpen = () => setTagsModalOpen(true);
  const handleTagsModalClose = () => setTagsModalOpen(false);

  useEffect(() => {
    axios.get(`http://tagnotes/api/note/${noteId}`).then((response) => {
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
      axios
        .post(`http://tagnotes/api/note/${noteId}`, note, {
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
      <Box
        padding={5}
        width={700}
        sx={{ borderRadius: 3, backgroundColor: "lightgray" }}
      >
        <TextField
          fullWidth={true}
          defaultValue={note?.title}
          onChange={onTitleChange}
        />
        <TextField
          multiline
          fullWidth={true}
          defaultValue={note?.content}
          onChange={onContentChange}
        />
        <Button size={"small"} onClick={handleTagsModalOpen}>
          Edit Tags
        </Button>
        <Modal
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={tagsModalOpen}
          onClose={handleTagsModalClose}
        >
          <TagAppender note={note} />
        </Modal>
        <Button variant={"outlined"} onClick={onSaveClick}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
