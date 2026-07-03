async function getBooks() {
  const res = await fetch("http://localhost:5000/books", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
}

export default async function TestPage() {
  const books = await getBooks();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Books</h1>

      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Rating</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.book_id}>
              <td className="border p-2">{book.book_id}</td>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.publish_year}</td>
              <td className="border p-2">{book.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}