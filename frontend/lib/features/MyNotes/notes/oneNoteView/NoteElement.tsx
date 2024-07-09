import { onDeleteButtonClick } from "@/lib/features/MyNotes/notes/buttonHandler";
import Note from "@/lib/types/Note";
import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";

export default function NoteElement(props: { note: Note }) {
  const { note } = props;
  return (
    <Box key={note.id} marginBottom={3}>
      <Stack
        direction={"row"}
        marginBottom={2}
        justifyContent={"space-between"}
      >
        <Box fontSize={32} sx={{ fontWeight: "bold" }}>
          {note.title}
        </Box>
        <Stack direction={"row"}>
          <Box display={"flex"} alignItems={"center"}>
            <Link href={`/note/${props.note.id}`}> Edit</Link>
          </Box>
          <Button
            size={"small"}
            onClick={() => onDeleteButtonClick(props.note.id)}
          >
            Del
          </Button>
        </Stack>
      </Stack>
      <Box whiteSpace={"pre-line"}>{note.content}</Box>
    </Box>
  );
}
