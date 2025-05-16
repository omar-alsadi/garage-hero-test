import { FinancialSummaryOptions } from "@/interfaces/financialSummary.interface";
import { cookies } from "next/headers";

const getFinancialSummary = async (opts: FinancialSummaryOptions) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/dashboard/accountant/financial-summary`,
  );

  url.searchParams.set("period", opts.period as string);

  // read the current refresh_token (httpOnly) cookie
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const apiKey = process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY!;

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      accept: "application/json",
      token,
      api_key: apiKey,
    },
    // revalidate once a minute
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Failed to load financial summary:", res.status);
    throw new Error("Financial summary fetch failed");
  }

  return res.json();
};

export default getFinancialSummary;
