import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // read the current refresh_token (httpOnly) cookie
  const token = req.cookies.get("token")?.value || "";

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/user/login/refresh_token`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        token,
        api_key: `${process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY}`,
      },
    },
  );

  const { access_token: newAccessToken } = await resp.json();

  // overwrite the front-end cookie
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "token",
    value: newAccessToken,
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  return res;
}
