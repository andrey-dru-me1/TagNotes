import NoteElement from "@/lib/features/MyNotes/notes/oneNoteView/NoteElement";
import Note from "@/lib/types/Note";
import { Stack } from "@mui/material";

export default function OneNoteView(props: { notes: Note[] }) {
  const { notes } = props;
  return (
    <Stack
      direction={"column"}
      border={3}
      borderRadius={3}
      padding={2}
      width={1000}
      fontFamily={"sans-serif"}
    >
      {notes.map((note) => (
        <NoteElement key={note.id} note={note} />
      ))}
    </Stack>
  );
}
