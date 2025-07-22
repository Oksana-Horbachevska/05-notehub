import SearchBox from "../SearchBox/SearchBox";
// import Pagination from "../Pagination/Pagination";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
import NoteList from "../NoteList/NoteList";
import fetchNotes from "../../services/noteService";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Note } from "../../types/note";

import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => {
      return fetchNotes(query, page);
    },
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const handleSearch = async (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelect = (note: Note) => {
    console.log(note);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {/* <Pagination /> */}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm />
        </Modal>
      )}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {isSuccess && data.notes.length > 0 && (
        <NoteList onSelect={handleSelect} notes={data.notes} />
      )}
      {isSuccess && data.notes.length === 0 && (
        <p className={css.empty}>No notes found</p>
      )}
    </div>
  );
}
