import api from "@/lib/features/api/api";
import Note from "@/lib/types/Note";
import { Box, Button, Stack, TextField } from "@mui/material";

export default function EditNote({
  note,
  setNote,
}: {
  note: Note;
  setNote: (note: Note) => void;
}) {
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
        .post(`/note/${note.id}`, note, {
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
    <Stack direction={"column"} width={700} margin={1}>
      <TextField
        fullWidth
        variant="standard"
        defaultValue={note?.title}
        onChange={onTitleChange}
        InputProps={{
          disableUnderline: true,
          sx: { fontSize: 32, fontWeight: "bold" },
        }}
      />
      <TextField
        multiline
        variant="standard"
        fullWidth
        value={note?.content}
        onChange={onContentChange}
        sx={{ height: "100%" }}
        InputProps={{
          disableUnderline: true,
          sx: { height: "100%", alignItems: "start" },
        }}
      />
      <Box>
        <Button
          sx={{ size: "fit-content" }}
          variant={"outlined"}
          onClick={onSaveClick}
        >
          Save
        </Button>
      </Box>
    </Stack>
  );
}
