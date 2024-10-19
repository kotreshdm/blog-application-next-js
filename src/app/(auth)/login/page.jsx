"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import FormTextField from "@/components/form/formTextField/FormTextField";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("kotreshdm@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handlePasswordChange = useCallback(
    (e) => setPassword(e.target.value),
    []
  );

  const emailField = useMemo(
    () => (
      <FormTextField
        name='email'
        label='Email Address'
        value={email}
        onChange={handleEmailChange}
        autoComplete='email'
        autoFocus
      />
    ),
    [email, handleEmailChange]
  );

  const passwordField = useMemo(
    () => (
      <FormTextField
        name='password'
        label='Password'
        type='password'
        value={password}
        onChange={handlePasswordChange}
        autoComplete='current-password'
      />
    ),
    [password, handlePasswordChange]
  );
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
      toast.error(result.error);
    } else {
      toast.success("Login successful");
      router.push(callbackUrl);
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
          Login
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {emailField}
            {passwordField}
            <Button
              type='submit'
              variant='contained'
              sx={{ mt: 3, mb: 2, width: "60%", textTransform: "capitalize" }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
