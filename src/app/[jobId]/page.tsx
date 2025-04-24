import { getSingleJob } from "@/services/jobsServices";
import { Typography, Card, CardContent } from "@mui/material";

const JobDetails = async ({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) => {
  const { jobId } = await params;
  const { data } = await getSingleJob({ jobId });

  return (
    <div className="max-w-3xl h-full bg-red-400 mx-auto mt-8">
      <Card className="shadow-md">
        <CardContent className="space-y-4">
          <Typography variant="h5" component="h2" fontWeight="bold">
            {data.designation}
          </Typography>

          <div className="flex justify-between text-gray-600 text-sm">
            <span>
              Posted on: {new Date(data.createdAt).toLocaleDateString()}
            </span>
            <span>Job Type: {data.jobType}</span>
          </div>

          <Typography variant="body1" className="text-gray-700">
            <strong>Department:</strong> {data.department}
          </Typography>

          <Typography variant="body1" className="text-gray-700">
            <strong>Salary:</strong> ৳{data.salary.toLocaleString()}
          </Typography>

          <Typography
            variant="body1"
            className="text-gray-700 whitespace-pre-line"
          >
            <strong>Description:</strong> {data.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetails;
