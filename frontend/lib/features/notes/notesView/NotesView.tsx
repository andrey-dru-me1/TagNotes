import NoteCard from "@/lib/features/notes/notesView/NoteCard";
import Note from "@/lib/types/Note";
import { Box } from "@mui/material";

export default function NotesView(props: { notes: Note[] }) {
  const { notes } = props;
  return (
    <Box>
      {notes?.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </Box>
  );
}
