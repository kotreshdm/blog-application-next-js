"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Sign In</h1>
      <button
        className='bg-blue-500 text-white px-6 py-2 rounded-md'
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
      <button
        className='mt-4 bg-gray-700 text-white px-6 py-2 rounded-md'
        onClick={() =>
          signIn("credentials", {
            email: "kotreshdm@gmail.com ",
            password: "password",
          })
        }
      >
        Sign in with Credentials
      </button>
    </div>
  );
}
