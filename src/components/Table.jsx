import { useState } from "react";

export default function Table({ data, posts, onEdit }) {
  return (
    <table className="w-full border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 text-left">Email</th>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Body</th>
          <th className="p-2 text-left">Post</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <Row key={item.id} row={item} postTitle={posts[item.postId]} onEdit={onEdit} />
        ))}
      </tbody>
    </table>
  );
}

function Row({ row, postTitle, onEdit }) {
  const [editName, setEditName] = useState(false);
  const [editBody, setEditBody] = useState(false);

  return (
    <tr className="border-b">
      <td className="p-2">{row.email}</td>
      <td className="p-2">
        {editName ? (
          <input
            className="border p-1"
            value={row.name}
            onChange={(e) => onEdit(row.id, "name", e.target.value)}
            onBlur={() => setEditName(false)}
            autoFocus
          />
        ) : (
          <span onClick={() => setEditName(true)}>{row.name}</span>
        )}
      </td>
      <td className="p-2">
        {editBody ? (
          <textarea
            className="border p-1 w-full"
            value={row.body}
            onChange={(e) => onEdit(row.id, "body", e.target.value)}
            onBlur={() => setEditBody(false)}
            autoFocus
          />
        ) : (
          <span onClick={() => setEditBody(true)}>{row.body}</span>
        )}
      </td>
      <td className="p-2">{postTitle}</td>
    </tr>
  );
}
