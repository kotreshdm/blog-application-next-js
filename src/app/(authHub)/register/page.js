"use client";
import { API } from "@/utils/urls";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(API.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.err);
      } else {
        toast.success(data.success);
        router.push("/login");
      }
    } catch (err) {
      toast.error("An error occured, please try again");
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <div className='container'>
      <div className='row d-flex justify-content-center align-items-center vh-90'>
        <div className='col-lg-5 p-4 shadow'>
          <h2 className='fw-bold lead mb-4'>Register</h2>

          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='form-control p-3 mb-4'
              placeholder='Your name'
              required
            />
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
        </div>
      </div>
    </div>
  );
};

export default Register;
