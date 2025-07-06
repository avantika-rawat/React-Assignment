export default function Pagination(props) {
  const totalPages = Math.ceil(props.total / props.perPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4 flex justify-center gap-2">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => props.onPageChange(number)}
          className={`px-3 py-1 border rounded ${
            props.currentPage === number ? "bg-blue-500 text-white" : ""
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
