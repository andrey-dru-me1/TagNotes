import api from "@/lib/features/api/api";
import TagGrid from "@/lib/features/MyNotes/common/TagGrid";
import { onDeleteButtonClick } from "@/lib/features/MyNotes/notes/buttonHandler";
import Note from "@/lib/types/Note";
import Tag from "@/lib/types/Tag";
import { Delete } from "@mui/icons-material";
import { Box, Button, Link, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function NoteCard(props: { note: Note }) {
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
    <Stack
      direction={"row"}
      key={props.note.id}
      marginY={2}
      width={1000}
      minHeight={70}
    >
      <Link
        fontFamily={"sans-serif"}
        color={"inherit"}
        underline="none"
        href={`/note/${props.note.id}`}
        sx={{
          borderRadius: 3,
          border: 3,
          width: 1,
        }}
      >
        <Stack direction={"row"}>
          <Box
            padding={1}
            fontSize={32}
            width={"100%"}
            sx={{
              fontWeight: "bold",
            }}
          >
            {props.note.title}
          </Box>
          <Box padding={0.5}>
            <TagGrid tags={tags} justifyContent="right" />
          </Box>
        </Stack>
      </Link>
      <Box padding={1}>
        <Button
          sx={{ color: "lightgray", minWidth: "fit-content" }}
          size={"small"}
          onClick={() => onDeleteButtonClick(props.note.id)}
        >
          <Delete fontSize="small" />
        </Button>
      </Box>
    </Stack>
  );
}
