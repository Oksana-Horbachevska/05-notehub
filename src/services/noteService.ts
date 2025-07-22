import axios from "axios";
import type { Note } from "../types/note";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
const URL = "https://notehub-public.goit.study/api/notes";

interface NoteResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}

export default async function fetchNotes(
  query: string,
  page: number
): Promise<NoteResponse> {
  const options = {
    params: {
      search: query,
      page,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  };

  const response = await axios.get(URL, options);
  console.log(response.data);
  return response.data;
}
