"use client";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
import { toast } from "sonner";
import Button from "@mui/material/Button";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { createJob } from "@/services/jobsServices";
import { customButtonStyle } from "@/styles/styles";

const CreateJob = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      data.salary = Number(data.salary);
      const res = await createJob(data);
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
    <div className=" max-w-xl w-full p-8 shadow-2xl">
      <div className="mb-4">
        <h1 className="text-center font-semibold text-xl uppercase">
          Publish Jobs{" "}
        </h1>
        <p className="text-center">Recruit New Bee</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <TextField
            required
            id="outlined-required"
            label="Designation"
            {...register("designation")}
          />
          {/* {errors.designation && (
            <span className="text-red-600">{errors.designation?.message}</span>
          )} */}

          <TextField
            required
            id="outlined-required"
            label="Department"
            {...register("department")}
          />
          {/* {errors.email && (
                <span className="text-red-600">{errors.email?.message}</span>
              )} */}

          <TextField
            type="number"
            required
            id="outlined-required"
            label="Salary"
            {...register("salary")}
          />
          {/* {errors.password && (
                <span className="text-red-600">{errors.password?.message}</span>
              )} */}

          <TextField
            required
            id="outlined-required"
            label="Description"
            {...register("description")}
          />
          {/* {passwordConfirm && password !== passwordConfirm && (
                <span className="text-red-600">Password does not match</span>
              )} */}
          <Controller
            name="jobType"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  Job Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Job Type"
                  required
                  {...field}
                >
                  <MenuItem value={"Full-time"}>Full-time</MenuItem>
                  <MenuItem value={"Part-time"}>Part-time</MenuItem>
                  <MenuItem value={"Remote"}>Remote</MenuItem>
                  <MenuItem value={"Internship"}>Internship</MenuItem>
                </Select>
              </FormControl>
            )}
          ></Controller>
        </div>
        <div className="flex justify-center mt-4">
          <Button type="submit" variant="outlined" sx={customButtonStyle()}>
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
