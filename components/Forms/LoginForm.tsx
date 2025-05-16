"use client";
import { useAuthStore } from "@/store/authStore";
import { useGlobalStore } from "@/store/globalStore";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export function LoginForm() {
  const router = useRouter();

  const { setIsOTPSent } = useAuthStore();

  const {
    userIpAddress,
    fetchIPAddress,
    isSubmitted,
    setIsSubmitted,
    isNoticed,
    gotNoticed,
    showToast,
  } = useGlobalStore();

  const { email, password, userType, isAuthenticated, setEmail, setPassword } =
    useAuthStore();

  // Validate the inputs and limit requests sent to BE
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid: boolean = isEmailValid && password.trim().length >= 8; // We can add more restirct for the password if we have

  useEffect(() => {
    setIsSubmitted(false);
    if (isAuthenticated) router.push("/");
    fetchIPAddress();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            api_key: `${process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY}`,
          },
          body: JSON.stringify({
            email: email.toLowerCase(),
            password,
            user_type: userType,
            ip_address: userIpAddress,
          }),
        },
      );

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      setIsOTPSent(true);
      showToast("OTP code has been sent", "success");
      router.push("/otp");
    } catch (err: any) {
      console.error("Error:", err);
      setIsOTPSent(false);
      showToast(err.message || "Login failed", "error");
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <img className="mb-6 mr-2" src="./gh_full_logo.svg" alt="logo" />
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <Card className="shadow-none">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email" className="mb-2 block dark:text-white">
                  Your email
                </Label>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-cyan-500 bg-ghred-50 text-ghred-900 placeholder:text-ghred-700 focus:border-ghred-500 focus:ring-ghred-500 dark:border-ghred-400 dark:bg-ghred-100 dark:focus:border-ghred-500 dark:focus:ring-ghred-500"
                />
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="mb-2 block dark:text-white"
                >
                  Password
                </Label>
                <TextInput
                  id="password"
                  placeholder="••••••••"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-cyan-500 bg-ghred-50 text-ghred-900 placeholder:text-ghred-700 focus:border-ghred-500 focus:ring-ghred-500 dark:border-ghred-400 dark:bg-ghred-100 dark:focus:border-ghred-500 dark:focus:ring-ghred-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <Checkbox id="remember" required={!isNoticed} />
                  </div>
                  <div className="ml-3 text-sm">
                    <Label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </Label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Button
                type="submit"
                className="w-full bg-ghred-500 hover:bg-ghred-600"
                disabled={isSubmitted || !isFormValid}
                onClick={gotNoticed}
              >
                Sign in
              </Button>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Don’t have an account yet?&nbsp;
                <a
                  href="#"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
