"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userInfo: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/create-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );

    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
