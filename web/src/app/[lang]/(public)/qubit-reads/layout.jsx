export const metadata = {
  title: "QubitReads by BookQubit - Your Digital Reading Platform",
  description: "Read thousands of books, comics, and academic resources anywhere, anytime. QubitReads - The future of digital reading.",
  keywords: "digital reading, ebooks, online library, book reader, QubitReads, BookQubit",
};

export default function QubitReadsLayout({ children }) {
  return (
    <div className="qubit-reads-layout">
      {children}
    </div>
  );
}