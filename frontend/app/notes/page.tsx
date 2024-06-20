"use client";

import api from "@/lib/features/api/api";
import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface Note {
  id: number;
  title: string;
  content: string;
}

interface Tag {
  id: number;
  name: string;
}

function onDeleteButtonClick(noteId: number) {
  axios.delete(`/api/note/${noteId}`).then(() => window.location.reload());
}

function NoteCard(props: { note: Note }) {
  const [tags, setTags] = useState<Tag[]>([]);

  const updateTags = () => {
    api
      .get(`/note/${props.note.id}/tags`)
      .then((response) => {
        const payload = response.data;
        setTags(payload);
      })
      .catch((e) => console.log(e));
  };

  useEffect(updateTags, []);

  return (
    <Stack direction={"row"} key={props.note.id} marginY={2} width={1000}>
      <Box
        fontSize={32}
        padding={1}
        sx={{ fontWeight: "bold", borderRadius: 4, border: 4, width: 1 }}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Container>{props.note.title}</Container>
        <Grid
          marginTop={-1}
          justifyContent={"right"}
          container
          gridRow={2}
          spacing={0}
        >
          {tags.map((tag: Tag) => (
            <Box marginX={0.5} marginY={-0.5}>
              <Chip size="small" label={tag.name} />{" "}
            </Box>
          ))}
        </Grid>
      </Box>
      <Stack direction={"row"}>
        <Button href={`/note/${props.note.id}`}>
          <Edit fontSize="small" />
        </Button>
        <Button
          size={"small"}
          onClick={() => onDeleteButtonClick(props.note.id)}
        >
          <Delete fontSize="small" />
        </Button>
      </Stack>
    </Stack>
  );
}

function NotesView(props: { notes: Note[] }) {
  const { notes } = props;
  return (
    <Box>
      {notes?.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </Box>
  );
}

function NoteElement(props: { note: Note }) {
  const { note } = props;
  return (
    <Box key={note.id} width={500}>
      <Box fontSize={26} sx={{ fontWeight: "bold" }}>
        {note.title}
        <Link
          fontSize={14}
          sx={{ fontWeight: "normal" }}
          href={`/note/${props.note.id}`}
        >
          {" "}
          Edit
        </Link>
        <Button
          size={"small"}
          onClick={() => onDeleteButtonClick(props.note.id)}
        >
          Del
        </Button>
      </Box>
      <Box>{note.content}</Box>
    </Box>
  );
}

function OneNoteView(props: { notes: Note[] }) {
  const { notes } = props;
  return (
    <ul>
      {notes.map((note) => (
        <NoteElement key={note.id} note={note} />
      ))}
    </ul>
  );
}

enum NoteView {
  Notes,
  OneNote,
}

export default function Notes() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Note[]>([]);
  const [view, setView] = useState<NoteView>(NoteView.Notes);

  useEffect(() => {
    api
      .get<Note[]>("/notes")
      .then((response) => {
        setIsLoading(false);
        const payload: Note[] = response.data;
        setData(payload);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error!</div>;
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
