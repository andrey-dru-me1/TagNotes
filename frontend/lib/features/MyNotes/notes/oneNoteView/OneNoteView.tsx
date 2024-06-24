import NoteElement from "@/lib/features/MyNotes/notes/oneNoteView/NoteElement";
import Note from "@/lib/types/Note";

export default function OneNoteView(props: { notes: Note[] }) {
  const { notes } = props;
  return (
    <ul>
      {notes.map((note) => (
        <NoteElement key={note.id} note={note} />
      ))}
    </ul>
  );
}
