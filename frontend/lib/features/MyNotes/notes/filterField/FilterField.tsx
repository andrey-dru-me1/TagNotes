import TagGrid from "@/lib/features/MyNotes/common/TagGrid";
import { setTags } from "@/lib/features/MyNotes/notes/filterField/filterFieldSlice";
import api from "@/lib/features/api/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Tag from "@/lib/types/Tag";
import { Add } from "@mui/icons-material";
import {
  Box,
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
      <Box width={"100%"} paddingX={1}>
        <Select
          multiple
          variant="standard"
          disableUnderline
          value={filterTags.map((tag) => tag.id)}
          size="small"
          fullWidth
          onChange={handleChange}
          sx={{ height: "100%" }}
          IconComponent={() => (
            <Add
              sx={{ position: "absolute", right: 0, pointerEvents: "none" }}
            />
          )}
          renderValue={(selected) => {
            const tags = selected
              .map((tagId) => possibleTags.find((tag) => tag.id === tagId))
              .filter((val): val is Tag => Boolean(val));
            return <TagGrid tags={tags} />;
          }}
        >
          {possibleTags.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Stack>
  );
}
