import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Table from "./components/Table";
import Pagination from "./components/Pagination";

function App() {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState({});
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const COMMENTS_API = "https://jsonplaceholder.typicode.com/comments";
  const POSTS_API = "https://jsonplaceholder.typicode.com/posts";
  const ITEMS_PER_PAGE = 10;

  // Fetch data on page load
 useEffect(() => {
  async function fetchData() {
    const [commentsRes, postsRes] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/comments'),
      fetch('https://jsonplaceholder.typicode.com/posts'),
    ]);

    const commentsData = await commentsRes.json();
    const postsData = await postsRes.json();

    // create map of postId to post title
    const postMap = {};
    postsData.forEach(post => {
      postMap[post.id] = post.title;
    });

    // handle localStorage edits
    const savedEdits = JSON.parse(localStorage.getItem("edits")) || {};
    const updatedComments = commentsData.map((c) => ({
      ...c,
      name: savedEdits[c.id]?.name || c.name,
      body: savedEdits[c.id]?.body || c.body,
    }));

    setPosts(postMap);      // <== this is used in Table.jsx
    setComments(updatedComments);
  }

  fetchData();
}, []);

  // Handle inline editing
  function handleEdit(id, field, value) {
    const updated = comments.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    );
    setComments(updated);

    const edits = JSON.parse(localStorage.getItem("edits")) || {};
    edits[id] = { ...edits[id], [field]: value };
    localStorage.setItem("edits", JSON.stringify(edits));
  }

  // Filter and paginate
  const filtered = comments.filter((c) =>
    c.name.toLowerCase().includes(searchText.toLowerCase()) ||
    c.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-4">
      <SearchBar search={searchText} setSearch={setSearchText} />
      <Table data={paginated} posts={posts} onEdit={handleEdit} />
      <Pagination
        total={filtered.length}
        perPage={ITEMS_PER_PAGE}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
}

export default App;
