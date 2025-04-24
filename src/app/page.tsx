import JobsComponent from "../components/module/jobs/Jobs";

export default function Home() {
  return (
    <div className="flex justify-center flex-col gap-4 mt-8">
      <div className="mx-auto">
        <h1 className="text-center text-3xl font-bold ">
          BROWSE OPEN POSITIONS
        </h1>
        <p className="text-center text-lg ">
          We are always on the lookout for talented people
        </p>
      </div>
      <div className="max-w-5xl mx-auto mt-4 w-full">
        <JobsComponent />
      </div>
    </div>
  );
}
