export const metadata = {
  title: "BookQubit Marketplace - Buy & Sell Books",
  description: "Buy and sell new and used books at BookQubit Marketplace. Find rare books, bestsellers, and academic books at great prices.",
  keywords: "book marketplace, buy books, sell books, used books, rare books, BookQubit",
};

export default function BookqubitMarketplaceLayout({ children }) {
  return (
    <div className="bookqubit-marketplace-layout">
      {children}
    </div>
  );
}