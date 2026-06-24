"use client";

import { useParams } from "next/navigation";
import LibraryDetail from "@/features/bookqubit-readers/collective-library/components/LibraryDetail";

export default function CollectiveDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  if (!slug) {
    return <div>Loading...</div>;
  }

  return <LibraryDetail slug={slug} />;
}
