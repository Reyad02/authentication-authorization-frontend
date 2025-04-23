"use server";

import { cookies } from "next/headers";

export const getToken = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  return accessToken;
};

export const getAllJobs = async () => {
  try {
    const token = await getToken();
    if (token) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/jobs/view-jobs`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.json();
    }
  } catch (error: any) {
    return Error(error);
  }
};
