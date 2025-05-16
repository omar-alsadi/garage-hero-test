const getMonthlyTarget = async (token: string) => {
  const apiKey = process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY!;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/dashboard/shared/monthly_target`,
    {
      headers: { accept: "application/json", token, api_key: apiKey },
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) console.error("Failed to load data");
  const payload = await res.json();

  console.log("payload: ", payload);

  return payload;
};

export default getMonthlyTarget;
