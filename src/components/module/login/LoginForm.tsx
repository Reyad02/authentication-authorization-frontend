"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { toast } from "sonner";
import { loginSchema } from "./LoginValidation";
import { loginUser } from "@/services/authServices";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { customButtonStyle } from "@/styles/styles";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className=" max-w-xl w-full p-8 shadow-2xl ">
      <div className="mb-4">
        <h1 className="text-center font-semibold text-xl uppercase">Sign In </h1>
        <p className="text-center">Sign in to apply for a job</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <TextField
            required
            id="outlined-required"
            label="Email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-600">{errors.email?.message}</span>
          )}

          <TextField
            type="password"
            required
            id="outlined-required"
            label="Password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-600">{errors.password?.message}</span>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Button sx={customButtonStyle()} type="submit" variant="outlined">
            {isSubmitting ? "Logging..." : "Login"}
          </Button>
        </div>
        <p className="text-center mt-4">
          If you do not have an account then{" "}
          <Link className="text-[#1565C0]" href={"/register"}>
            register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
