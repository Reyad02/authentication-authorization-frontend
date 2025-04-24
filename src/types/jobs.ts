export interface IJob {
  _id: string;
  salary: number;
  jobType: "Full-time" | "Part-time" | "Remote" | "Internship";
  description: string;
  postedBy: string;
  department: string;
  designation: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
