import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const handleFormSearch = (formData: FormData) => {
    const query = formData.get("query") as string;
    onSearch(query);
  };

  return (
    <form action={handleFormSearch} className={css.form}>
      <input
        className={css.input}
        type="text"
        name="query"
        autoComplete="off"
        placeholder="Search movies..."
        autoFocus
      />
    </form>
  );
}
