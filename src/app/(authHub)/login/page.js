"use client";
import { Suspense, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...1234</div>}>
      <LoginComponent />
    </Suspense>
  );
};

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);

    if (result.error) {
      console.log(result);
      toast.error(`${result.error}`);
    } else {
      toast.success("Login successful");
      router.push(callbackUrl);
    }
  };

  return (
    <div className='container'>
      <div className='row d-flex justify-content-center align-items-center vh-90'>
        <div className='col-lg-5 p-4 shadow'>
          <h2 className='fw-bold lead mb-4'>Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-control p-3 mb-4'
              placeholder='Your email'
              required
            />
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='form-control p-3 mb-4'
              placeholder='Your password'
              required
            />
            <button
              className='btn btn-lg w-100 btn-primary mb-2'
              disabled={loading}
            >
              {loading ? "Please wait.." : "Submit"}
            </button>
          </form>

          {/* <button
            onClick={() => signIn("google", { callbackUrl })}
            className='btn btn-danger btn-lg w-100 my-4 shadow'
          >
            Sign in with Google
          </button> */}

          <Link
            href='/forgot-password'
            className='nav-link text-center mt-3 text-danger'
          >
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
