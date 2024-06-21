import NoteEditorComponent from "@/lib/features/noteEditor/NoteEditor";

export default function NoteEditorPage({
  params: { noteId },
}: {
  params: { noteId: number };
}) {
  return <NoteEditorComponent noteId={noteId} />;
}
