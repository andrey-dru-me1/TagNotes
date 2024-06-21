import api from "@/lib/features/api/api";
import { onDeleteButtonClick } from "@/lib/features/notes/buttonHandler";
import Note from "@/lib/types/Note";
import Tag from "@/lib/types/Tag";
import { Delete } from "@mui/icons-material";
import { Box, Button, Chip, Container, Grid, Link, Stack } from "@mui/material";
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
    <Stack direction={"row"} key={props.note.id} marginY={2} width={1000}>
      <Link
        fontSize={32}
        fontFamily={"sans-serif"}
        color={"inherit"}
        underline="none"
        padding={1}
        href={`/note/${props.note.id}`}
        sx={{
          fontWeight: "bold",
          borderRadius: 3,
          border: 3,
          width: 1,
        }}
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
            <Box key={tag.id} marginX={0.5} marginY={-0.5}>
              <Chip size="small" label={tag.name} />{" "}
            </Box>
          ))}
        </Grid>
      </Link>
      <Button size={"small"} onClick={() => onDeleteButtonClick(props.note.id)}>
        <Delete fontSize="small" />
      </Button>
    </Stack>
  );
}
