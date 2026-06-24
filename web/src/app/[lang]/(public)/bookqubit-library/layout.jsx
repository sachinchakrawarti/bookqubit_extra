export const metadata = {
  title: "BookQubit Library - Find Physical Libraries Near You",
  description: "Discover BookQubit physical libraries in every city. Find your nearest library, check timings, and explore our collection.",
  keywords: "physical library, book library, city library, BookQubit library, local library",
};

export default function BookqubitLibraryLayout({ children }) {
  return (
    <div className="bookqubit-library-layout">
      {children}
    </div>
  );
}