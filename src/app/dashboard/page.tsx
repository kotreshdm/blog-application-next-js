"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to the Dashboard, {session?.user?.name}!</h1>
      <button
        className='bg-red-500 text-white px-4 py-2'
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}
