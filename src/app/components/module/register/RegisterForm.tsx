"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "./RegisterValidation";
import { Button, TextField } from "@mui/material";
import { registerUser } from "@/services/authServices";
import { toast } from "sonner";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");
  return (
    <div className=" max-w-xl w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <TextField
            required
            id="outlined-required"
            label="Name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-600">{errors.name?.message}</span>
          )}

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

          <TextField
            type="password"
            required
            id="outlined-required"
            label="Confirm Password"
            {...register("passwordConfirm")}
          />
          {passwordConfirm && password !== passwordConfirm && (
            <span className="text-red-600">Password does not match</span>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Button type="submit" variant="contained">
            {isSubmitting? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
