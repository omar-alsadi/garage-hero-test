import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period");
  if (!period) {
    return NextResponse.json({ error: "period is required" }, { status: 400 });
  }

  // grab the access token from the cookie
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // forward the request to your backend
  const url = new URL(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dashboard/accountant/financial-summary`,
  );
  url.searchParams.set("period", period);

  const res = await fetch(url.toString(), {
    headers: {
      accept: "application/json",
      token,
      api_key: process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY!,
    },
  });

  if (!res.ok) {
    // e.g. 401 / 403 / 500 from your backend
    const err = await res.json().catch(() => ({ error: res.statusText }));
    return NextResponse.json(err, { status: res.status });
  }

  const payload = await res.json();
  return NextResponse.json(payload);
}
