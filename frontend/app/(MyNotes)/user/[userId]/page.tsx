"use client";

import api from "@/lib/features/api/api";
import OneNoteView from "@/lib/features/MyNotes/notes/oneNoteView/OneNoteView";
import Note from "@/lib/types/Note";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

interface User {
  name: string;
  popularNote: Note;
}

export default function UserPage({
  params: { userId },
}: {
  params: { userId: number };
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.get(`/user/${userId}`).then((response) => {
      const payload = response.data;
      setUser(payload);
    });
  }, []);

  return (
    <Stack direction={"column"}>
      User name: {user?.name}
      <Stack direction={"column"}>
        Popular Note:
        {user && <OneNoteView notes={[user.popularNote]}></OneNoteView>}
      </Stack>
    </Stack>
  );
}
