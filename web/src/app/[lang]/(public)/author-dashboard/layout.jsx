export const metadata = {
  title: "Author Dashboard - BookQubit",
  description: "Manage your books, track sales, and connect with readers on BookQubit",
  keywords: "author dashboard, book management, author tools, BookQubit",
};

export default function AuthorDashboardLayout({ children }) {
  return (
    <div className="author-dashboard-layout">
      {children}
    </div>
  );
}