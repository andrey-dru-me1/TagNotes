import { setTags } from "@/lib/features/MyNotes/notes/filterField/filterFieldSlice";
import api from "@/lib/features/api/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Tag from "@/lib/types/Tag";
import {
  Box,
  Chip,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function FilterField() {
  const [possibleTags, setPossibleTags] = useState<Tag[]>([]);
  const filterTags = useAppSelector((state) => state.filter.filterTags);
  const dispatch = useAppDispatch();

  const getPossibleTags = () => {
    api
      .get("/tags")
      .then((response) => {
        const payload = response.data;
        setPossibleTags(payload);
      })
      .catch((e) => console.log(e));
  };

  useEffect(getPossibleTags, []);

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    if (typeof value !== "string") {
      const tags = value.map((tagId) =>
        possibleTags.find((tag) => tag.id === tagId)
      );
      dispatch(setTags(tags));
    }
  };

  return (
    <Stack
      direction={"row"}
      border={4}
      borderColor={"black"}
      borderRadius={4}
      maxWidth={1000}
    >
      <Box fontSize={30} margin={2}>
        Filter:
      </Box>
      <Divider orientation="vertical" flexItem />
      <Select
        multiple
        variant="standard"
        value={filterTags.map((tag) => tag.id)}
        size="small"
        fullWidth
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => {
              const tag = possibleTags.find((tag) => tag.id === value);
              if (tag === undefined) return;
              return <Chip size="small" key={tag.id} label={tag.name} />;
            })}
          </Box>
        )}
      >
        {possibleTags.map((tag) => (
          <MenuItem key={tag.id} value={tag.id}>
            {tag.name}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}
