import axios from "axios";

function onDeleteButtonClick(noteId: number) {
  axios.delete(`/api/note/${noteId}`).then(() => window.location.reload());
}

export { onDeleteButtonClick };
