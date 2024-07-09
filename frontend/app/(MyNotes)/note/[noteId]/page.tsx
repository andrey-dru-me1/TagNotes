import NoteEditor from "@/lib/features/MyNotes/noteEditor/NoteEditor";

export default function NoteEditorPage({
  params: { noteId },
}: {
  params: { noteId: number };
}) {
  return <NoteEditor noteId={noteId} />;
}
