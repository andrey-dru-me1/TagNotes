import { onDeleteButtonClick } from "@/lib/features/notes/buttonHandler";
import Note from "@/lib/types/Note";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function NoteElement(props: { note: Note }) {
  const { note } = props;
  return (
    <Box key={note.id} width={500}>
      <Box fontSize={26} sx={{ fontWeight: "bold" }}>
        {note.title}
        <Link href={`/note/${props.note.id}`}> Edit</Link>
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
