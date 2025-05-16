"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useGlobalStore } from "@/store/globalStore";
import { Button } from "flowbite-react";
import { FormEvent, useEffect, useRef, useState } from "react";

export function EmailVerificationOTPForm() {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const isOtpValid = otp.every((char) => char.trim().length === 1);

  const { email, userType, isOTPSent, isAuthenticated, setIsAuthenticated } =
    useAuthStore();

  const {
    userIpAddress,
    fetchIPAddress,
    isSubmitted,
    setIsSubmitted,
    showToast,
  } = useGlobalStore();

  useEffect(() => {
    fetchIPAddress();
    if (isAuthenticated || !isOTPSent) {
      router.replace("/");
    } else {
      inputsRef.current[0]?.focus();
    }
  }, []);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    setIsSubmitted(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/user/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            api_key: `${process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY}`,
          },
          body: JSON.stringify({
            email: email.toLowerCase(),
            user_type: userType,
            otp: otp.join(""),
            ip_address: userIpAddress,
          }),
        },
      );

      if (!res.ok) throw new Error("Invalid OTP or OTP has expired.");

      const data = await res.json();
      document.cookie = [
        `token=${data.access_token}`,
        `Max-Age=${60 * 60 * 24 * 7}`,
        `Path=/`,
        `SameSite=Lax`,
      ].join("; ");

      setIsAuthenticated(true);
      showToast("Login successful!", "success");
      router.replace("/dashboard");
    } catch (err: any) {
      console.error("Error:", err);
      showToast(err.msg || "Invalid OTP or OTP has expired.", "error");
    } finally {
      setIsSubmitted(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    if (e.key === "Backspace" || e.key === "DELETE") {
      if (otp[idx]) {
        return;
      }

      e.preventDefault();

      const prevIdx = idx - 1;
      if (prevIdx >= 0) {
        const updated = [...otp];
        updated[prevIdx] = "";
        setOtp(updated);
        inputsRef.current[prevIdx]?.focus();
      }
    }
  };

  const handleOtpChange = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otp];
    const updated = [...otp];
    updated[idx] = value;
    setOtp(updated);

    if (value && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }

    if (idx === 5 && next.every((ch) => ch.length === 1)) {
      handleSubmit();
    }
  };

  return (
    <section className="bg-white px-4 py-8 dark:bg-gray-900 lg:py-0">
      <div className="lg:flex">
        <div className="bg-primary-600 hidden w-full max-w-md p-12 lg:block lg:h-screen">
          <div className="mb-8 flex items-center space-x-4">
            <a
              href="/"
              className="flex items-center text-2xl font-semibold text-white"
            >
              <img alt="" src="./gh_small_logo.svg" className="mr-2 size-11" />
            </a>
            <a
              href="/login"
              className="text-primary-100 inline-flex items-center text-sm font-medium hover:text-white"
            >
              <svg
                className="mr-1 size-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Go back
            </a>
          </div>
        </div>
        <div className="mx-auto flex items-center md:w-[42rem] md:px-8 xl:px-0">
          <div className="w-full">
            <div className="mb-8 flex items-center justify-center space-x-4 lg:hidden">
              <a href="#" className="flex items-center text-2xl font-semibold">
                <img
                  alt=""
                  className="mr-2 size-8"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                />
                <span className="text-gray-900 dark:text-white">Flowbite</span>
              </a>
            </div>
            <h1 className="mb-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
              Verify your email address
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              We emailed you a six-digit code to&nbsp;
              <span className="font-medium text-gray-900 dark:text-white">
                {email.toLowerCase()}
              </span>
              . Enter the code below to confirm your email address.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="my-4 flex space-x-2 sm:space-x-4 md:my-6">
                {Array.from({ length: 6 }).map((_, index) => {
                  return (
                    <div key={`${index}-code`}>
                      <label htmlFor={`code-${index}`} className="sr-only">
                        code
                      </label>
                      <input
                        id={`code-${index}`}
                        maxLength={1}
                        onKeyUp={() =>
                          (
                            document.querySelector(
                              `#code-${index + 1}`,
                            ) as HTMLInputElement
                          )?.focus()
                        }
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        required
                        type="text"
                        className="block size-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 focus:border-ghred-500 focus:ring-ghred-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-ghred-500 dark:focus:ring-ghred-500 sm:size-16 sm:py-4 sm:text-4xl"
                      />
                    </div>
                  );
                })}
              </div>
              <p className="mb-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400 md:mb-6">
                Make sure to keep this window open while checking your inbox.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="submit"
                  size="xl"
                  className="w-full bg-ghred-500 hover:bg-ghred-600 [&>span]:text-sm"
                  disabled={isSubmitted || !isOtpValid}
                >
                  Verify account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
