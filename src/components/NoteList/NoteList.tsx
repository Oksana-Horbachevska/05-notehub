import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProsps {
  notes: Note[];
  onSelect: (note: Note) => void;
}

export default function NoteList({ notes, onSelect }: NoteListProsps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li
          key={note.id}
          className={css.listItem}
          onClick={() => onSelect(note)}
        >
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
