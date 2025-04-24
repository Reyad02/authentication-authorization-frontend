"use client";
import { deleteSingleJob, getAllJobs } from "@/services/jobsServices";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { toast } from "sonner";
import { IJob } from "@/types/jobs";
import { customButtonStyle } from "@/styles/styles";

const JobsComponent = () => {
  const [data, setData] = useState<IJob[] | null>(null);
  const [category, setCategory] = useState<string[] | null>(null);
  const [expanded, setExpanded] = useState<string | false>(false);

  const fetchJobs = async () => {
    const response = await getAllJobs();
    setData(response?.data);
    const uniqueCategories: string[] = [];
    response?.data.forEach((element: IJob) => {
      if (!uniqueCategories.includes(element?.department)) {
        uniqueCategories.push(element?.department);
      }
    });
    setCategory(uniqueCategories);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const deleteJob = async (jobId: string) => {
    const res = await deleteSingleJob({ jobId });
    if (res?.success) {
      toast.success(res?.message);
      fetchJobs();
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className=" ">
      {category?.map((cat: string, idx: number) => (
        <Accordion
          key={idx}
          className="bg-[#F5F5F5] mt-4 rounded-4xl"
          expanded={expanded === `panel${idx}`}
          onChange={handleChange(`panel${idx}`)}
          sx={{
            backgroundColor: "#F5F5F5",
            borderColor: "#BCBCBC",
            border: "1px",
            borderStyle: "solid",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
              <p className="text-[#626262] font-semibold text-xl">{cat}</p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col">
            {data
              ?.filter((job: IJob) => job.department === cat)
              ?.map((job: IJob, idx: number) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-2 mt-2 border rounded-lg bg-white"
                >
                  <Typography>{job?.designation}</Typography>

                  <div className="flex items-center gap-2">
                    <Link href={`/${job._id}`}>
                      {" "}
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        sx={customButtonStyle()}
                      >
                        View
                      </Button>
                    </Link>

                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      sx={customButtonStyle()}
                      onClick={() => {
                        const toastId = toast(
                          <div className="p-4 bg-white rounded shadow flex flex-col gap-3">
                            <span>
                              Are you sure you want to delete this job?
                            </span>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                onClick={() => {
                                  deleteJob(job._id);
                                  toast.dismiss(toastId);
                                }}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => toast.dismiss(toastId)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default JobsComponent;
