"use client";
import { getAllJobs } from "@/services/jobsServices";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const JobsComponent = () => {
  const [data, setData] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await getAllJobs();
      setData(response.data);
      const uniqueCategories: string[] = [];
      response.data.forEach((element: any) => {
        if (!uniqueCategories.includes(element?.department)) {
          uniqueCategories.push(element?.department);
        }
      });
      setCategory(uniqueCategories);
    };

    fetchJobs();
  }, []);

  console.log(data, category);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className=" ">
      {category?.map((cat: string, idx: number) => (
        <Accordion
          key={idx}
          className="bg-[#F5F5F5] mt-4 rounded-4xl"
          expanded={expanded === `panel${idx}`}
          onChange={handleChange(`panel${idx}`)}
          //   sx={{
          //     backgroundColor: "#F5F5F5",
          //     borderRadius: "1rem",
          //   }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
              {cat}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="flex justify-between items-center">
            {data
              ?.filter((job: any) => job.department === cat)
              ?.map((job: any, idx: number) => (
                <Typography key={idx}>{job?.designation}</Typography>
              ))}

            <div className="flex items-center gap-2">
              <Button variant="outlined" size="small" startIcon={<VisibilityIcon />}>
                View
              </Button>
              <Button variant="outlined" size="small" startIcon={<DeleteIcon />}>
                Delete
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default JobsComponent;
