"use client";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import FormTextField from "@/components/form/formTextField/FormTextField";
import apiService from "@/utils/api";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handlePasswordChange = useCallback(
    (e) => setPassword(e.target.value),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiService.post("/register", {
        name,
        email,
        password,
      });
      console.log("Registration successful:", response);
      toast.success("Registration successful! Please log in.");
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.status === 409) {
        toast.error(
          "This email is already registered. Please use a different email or try logging in!."
        );
      } else {
        toast.error(
          error.message || "Registration failed. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormTextField
            name='name'
            label='Full Name'
            value={name}
            onChange={handleNameChange}
            autoComplete='name'
            autoFocus
          />
          <FormTextField
            name='email'
            label='Email Address'
            value={email}
            onChange={handleEmailChange}
            autoComplete='email'
          />
          <FormTextField
            name='password'
            label='Password'
            type='password'
            value={password}
            onChange={handlePasswordChange}
            autoComplete='new-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
