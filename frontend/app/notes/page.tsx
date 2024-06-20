"use client";

import {
  Box,
  Button,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface Note {
  id: number;
  title: string;
  content: string;
}

function onDeleteButtonClick(noteId: number) {
  axios.delete(`/api/note/${noteId}`).then(() => window.location.reload());
}

function NoteCard(props: { note: Note }) {
  return (
    <Box
      key={props.note.id}
      marginY={2}
      padding={1}
      height={70}
      width={700}
      sx={{
        backgroundColor: "lightgray",
        borderRadius: 2,
        input: { cursor: "pointer" },
      }}
    >
      <Box fontSize={26} sx={{ fontWeight: "bold" }}>
        {props.note.title}
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
    </Box>
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
    axios
      .get<Note[]>("http://tagnotes/api/notes")
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
    axios
      .post("http://tagnotes/api/note", { title: "Untitled", content: "" })
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
