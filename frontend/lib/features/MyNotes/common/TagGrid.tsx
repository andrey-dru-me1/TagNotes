import Tag from "@/lib/types/Tag";
import { Box, Chip } from "@mui/material";

export default function TagGrid({
  tags,
  justifyContent = "left",
  onDelete,
}: {
  tags: Tag[];
  justifyContent?: string;
  onDelete?: (tag: Tag) => void;
}) {
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={justifyContent}
      width={"initial"}
      height={"fit-content"}
      fontWeight={"bold"}
      gap={0.5}
    >
      {tags.map((tag: Tag) => (
        <Box key={tag.id}>
          <Chip
            size="small"
            label={tag.name}
            onClick={(e) => e.stopPropagation()}
            onDelete={onDelete ? () => onDelete(tag) : undefined}
          />
        </Box>
      ))}
    </Box>
  );
}
