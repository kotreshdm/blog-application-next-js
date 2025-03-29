"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (!res || !res.ok) {
      toast.error(res?.error || "Login failed!");
    } else {
      toast.success("Login successful!");
      window.location.href = callbackUrl;
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Sign In</h1>
      {/* <button
        className='bg-blue-500 text-white px-6 py-2 rounded-md mb-4'
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button> */}

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-2'>
          {/* <label className='font-medium' htmlFor='email'>
            Email Address
          </label> */}
          <div className='relative'>
            <FaEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
            <input
              id='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full border px-4 py-2 pl-10 rounded-md outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400'
              required
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          {/* <label className='font-medium' htmlFor='password'>
            Password
          </label> */}
          <div className='relative'>
            <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
            <input
              id='password'
              type={showPassword ? "text" : "password"}
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full border px-4 py-2 pl-10 pr-10 rounded-md outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400'
              required
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button
          type='submit'
          disabled={loading}
          className={`px-6 py-2 rounded-md text-white transition-all ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gray-700 hover:bg-gray-800 cursor-pointer"
          }`}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
