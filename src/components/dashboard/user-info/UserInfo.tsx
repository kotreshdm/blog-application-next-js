"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function UserInfo() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className='space-x-2 text-gray-700'>
      <FaUserCircle size={24} className='text-gray-600' />
      <p>Hi, {session?.user?.name || "Guest"}!</p>
    </div>
  );
}
