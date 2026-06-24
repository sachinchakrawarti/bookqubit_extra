export const metadata = {
  title: "BookQubit Store - Find Local Bookstores Near You",
  description: "Discover BookQubit local stores in your city. Find books, stationery, and more at our physical stores.",
  keywords: "bookstore, local store, book shop, BookQubit store, physical store",
};

export default function BookqubitStoreLayout({ children }) {
  return (
    <div className="bookqubit-store-layout">
      {children}
    </div>
  );
}