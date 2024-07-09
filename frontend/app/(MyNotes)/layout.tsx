import MyNotesWrapper from "@/lib/features/MyNotes/myNotesWrapper/MyNotesWrapper";
import React from "react";

export default function MyNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MyNotesWrapper>{children}</MyNotesWrapper>;
}
