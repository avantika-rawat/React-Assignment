export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Comments Table</h1>
      <input
        className="p-2 border rounded w-1/2"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
