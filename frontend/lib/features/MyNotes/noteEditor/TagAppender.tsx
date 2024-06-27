import api from "@/lib/features/api/api";
import Note from "@/lib/types/Note";
import Tag from "@/lib/types/Tag";
import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function TagAppender({ note }: { note: Note | null }) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [possibleTags, setPossibleTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState<string>("");

  const updateTags = () => {
    api
      .get(`/note/${note?.id}/tags`)
      .then((response) => {
        const payload = response.data;
        setTags(payload);
      })
      .catch((e) => console.log(e));
  };

  const getPossibleTags = () => {
    api
      .get("/tags")
      .then((response) => {
        const payload = response.data;
        setPossibleTags(payload);
      })
      .catch((e) => console.log(e));
  };

  const pinTag = (tagId: number) => {
    api
      .post(`/note/${note?.id}/tag/${tagId}`)
      .then(updateTags)
      .catch((e) => console.log(e));
  };

  const deleteTag = (tagId: number) => {
    api.delete(`/tag/${tagId}`).then(() => {
      updateTags();
      getPossibleTags();
    });
  };

  useEffect(updateTags, []);
  useEffect(getPossibleTags, []);

  const onDelClick = (tagId: number) => {
    api.delete(`/note/${note?.id}/tag/${tagId}`, {}).then(updateTags);
  };

  const onChange = ({ target: { value } }: { target: { value: string } }) => {
    if (typeof value === "number") {
      pinTag(value);
    }
  };

  return (
    <Box padding={3}>
      {tags.map((tag) => (
        <Box key={tag.id} fontSize={20}>
          {tag.name} <Button onClick={() => onDelClick(tag.id)}>Del</Button>
        </Box>
      ))}
      <Select sx={{ minWidth: 200 }} onChange={onChange}>
        {possibleTags
          .filter((tag) => !tags.includes(tag))
          .map((tag: Tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Box>{tag.name}</Box>
                <Button
                  sx={{ color: "gray" }}
                  size="small"
                  onClick={() => deleteTag(tag.id)}
                >
                  <DeleteOutline fontSize="small" />
                </Button>
              </Stack>
            </MenuItem>
          ))}
      </Select>
      <Stack direction={"row"}>
        <TextField
          value={newTagName}
          onChange={({ target: { value } }) => setNewTagName(value)}
        ></TextField>
        <Button
          onClick={() => {
            api.post("/tag", { name: newTagName }).then((response) => {
              const newTag: Tag = response.data;
              pinTag(newTag.id);
              getPossibleTags();
              setNewTagName("");
            });
          }}
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
}
