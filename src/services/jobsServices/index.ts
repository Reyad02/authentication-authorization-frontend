"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

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

export const createJob = async (jobInfo: FieldValues) => {
  try {
    const token = await getToken();
    if (token) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/jobs/create-job`,
        {
          method: "POST",
          body: JSON.stringify(jobInfo),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const result = await res.json();
      return result;
    }
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteSingleJob = async ({ jobId }: { jobId: string }) => {
  try {
    const token = await getToken();
    if (token) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/jobs/${jobId}`,

        {
          method: "DELETE",
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

export const getSingleJob = async ({ jobId }: { jobId: string }) => {
  try {
    const token = await getToken();
    if (token) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/jobs/${jobId}`,
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
