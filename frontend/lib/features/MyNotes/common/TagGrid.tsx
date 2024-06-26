import Tag from "@/lib/types/Tag";
import { Box, Chip, Grid } from "@mui/material";

export default function TagGrid({
  tags,
  justifyContent,
}: {
  tags: Tag[];
  justifyContent: string;
}) {
  return (
    <Grid
      container
      justifyContent={justifyContent}
      width={"initial"}
      height={"fit-content"}
    >
      {tags.map((tag: Tag) => (
        <Box key={tag.id} margin={0.3}>
          <Chip size="small" label={tag.name} />
        </Box>
      ))}
    </Grid>
  );
}
