import api from "@/lib/features/api/api";
import TagGrid from "@/lib/features/MyNotes/common/TagGrid";
import { appendTag } from "@/lib/features/MyNotes/notes/filterField/filterFieldSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Tag from "@/lib/types/Tag";
import { Box, Divider, MenuItem, Select, Stack } from "@mui/material";
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

  return (
    <Stack direction={"row"} border={4} borderColor={"black"} borderRadius={4}>
      <Box fontSize={30} margin={2}>
        Filter:
      </Box>
      <Divider orientation="vertical" flexItem />
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
        padding={1}
      >
        <TagGrid tags={filterTags} justifyContent="left" />
        <Select size="small">
          {possibleTags.map((tag) => (
            <MenuItem
              key={tag.id}
              onClick={() => {
                dispatch(appendTag(tag));
              }}
            >
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
}
