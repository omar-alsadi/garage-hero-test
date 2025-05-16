import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  console.log("token: ", token);
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const apiKey = process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY!;
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dashboard/shared/monthly_target`,
    {
      headers: { accept: "application/json", token, api_key: apiKey },
    },
  );

  if (!resp.ok) {
    console.error("backend error:", resp.status);
    return NextResponse.error();
  }

  const data = await resp.json();
  return NextResponse.json(data);
}
