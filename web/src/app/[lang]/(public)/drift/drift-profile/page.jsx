// src/app/[lang]/(public)/drift/drift-profile/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import DriftProfile from "@/features_drift/drift_profile/drift_profile"; // ← Fixed import path

export default function DriftProfilePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const userId = searchParams.get('userId') || params?.userId || '1';
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOwnProfile = async () => {
      try {
        const isOwn = searchParams.get('own') === 'true';
        setIsOwnProfile(isOwn);
        setLoading(false);
      } catch (error) {
        console.error("Error checking profile ownership:", error);
        setLoading(false);
      }
    };

    checkOwnProfile();
  }, [userId, searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DriftProfile 
        userId={userId} 
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
}