"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TokenRefresher() {
  // read the current refresh_token (httpOnly) cookie
  const router = useRouter();

  useEffect(() => {
    let id: NodeJS.Timeout;

    const refresh = async () => {
      const token = document
        ? document.cookie
            .split("; ")
            .find((c) => c.startsWith("token="))
            ?.split("=")[1]
        : "";

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/user/login/refresh_token`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              token: token as string,
              api_key: `${process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY}`,
            },
          },
        );

        const payload = await res.json();

        // overwrite the old cookie
        document.cookie = [
          `token=${payload.access_token}`,
          `Max-Age=${60 * 60 * 24 * 7}`,
          `Path=/`,
          `SameSite=Lax`,
        ].join("; ");
      } catch {
        router.replace("/login");
      }
    };

    refresh();
    id = setInterval(refresh, 30_000);

    return () => clearInterval(id);
  }, []);

  return null;
}
