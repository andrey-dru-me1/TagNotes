"use client";

import api from "@/lib/features/api/api";
import { changeNoteView } from "@/lib/features/MyNotes/myNotesWrapper/myNotesWrapperSlice";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import NoteView from "@/lib/types/NoteView";
import { AccountCircleOutlined } from "@mui/icons-material";
import {
  Box,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function MyNotesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const noteView = useAppSelector((state: RootState) => state.myNotes.noteView);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
      <RadioGroup value={noteView}>
        <FormControlLabel
          value={NoteView.Notes}
          control={<Radio />}
          label="Notes"
          onClick={() => dispatch(changeNoteView(NoteView.Notes))}
        ></FormControlLabel>
        <FormControlLabel
          value={NoteView.OneNote}
          control={<Radio />}
          label="One Note"
          onClick={() => dispatch(changeNoteView(NoteView.OneNote))}
        ></FormControlLabel>
      </RadioGroup>
      <Box>{children}</Box>
      <Box alignItems={"top"}>
        <IconButton
          onClick={(event: React.MouseEvent<HTMLElement>) =>
            setAnchorEl(event.currentTarget)
          }
        >
          <AccountCircleOutlined sx={{ fontSize: "40px" }} />
        </IconButton>
      </Box>
      <Menu
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorEl={anchorEl}
      >
        <MenuItem
          onClick={() =>
            api
              .get("/user")
              .then(
                (response) => (window.location.href = `/user/${response.data}`)
              )
          }
        >
          Profile
        </MenuItem>
        <MenuItem onClick={() => (window.location.href = "/notes")}>
          MyNotes
        </MenuItem>
        <MenuItem onClick={() => (window.location.href = "/login")}>
          Log out
        </MenuItem>
      </Menu>
    </Stack>
  );
}
