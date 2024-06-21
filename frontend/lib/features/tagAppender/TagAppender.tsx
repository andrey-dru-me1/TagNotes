import api from "@/lib/features/api/api";
import { Box, Button, MenuItem, Select } from "@mui/material";
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

export default function TagAppender({ note }: { note: Note | null }) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagId, setNewTagId] = useState<string>("");
  const [possibleTags, setPossibleTags] = useState<Tag[]>([]);

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

  useEffect(updateTags, []);
  useEffect(getPossibleTags, []);

  const onDelClick = (tagId: number) => {
    api.delete(`/note/${note?.id}/tag/${tagId}`, {}).then(updateTags);
  };

  const onAddClick = () => {
    api
      .post(`/note/${note?.id}/tag/${newTagId}`)
      .then(updateTags)
      .catch((e) => console.log(e));
  };

  const onChange = ({ target: { value } }: { target: { value: string } }) => {
    setNewTagId(value);
  };

  return (
    <Box padding={3}>
      {tags.map((tag) => (
        <Box fontSize={20}>
          {tag.name} <Button onClick={() => onDelClick(tag.id)}>Del</Button>
        </Box>
      ))}
      <Select sx={{ minWidth: 200 }} onChange={onChange} value={newTagId}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {possibleTags.map((tag: Tag) => (
          <MenuItem value={tag.id}>{tag.name}</MenuItem>
        ))}
      </Select>
      <Button onClick={onAddClick}>Add tag</Button>
    </Box>
  );
}
