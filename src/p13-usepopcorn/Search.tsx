export type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};
export function Search({ query, setQuery }: Props) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
