"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { toast } from "sonner";
import { loginSchema } from "./LoginValidation";
import { loginUser } from "@/services/authServices";

const LoginForm = () => {
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
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className=" max-w-xl w-full p-8 shadow-2xl ">
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
          <Button type="submit" variant="contained">
            {isSubmitting ? "Logging..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
