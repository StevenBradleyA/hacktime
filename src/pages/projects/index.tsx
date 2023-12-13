import ProjectCard from "~/components/Projects/DisplayProjects";
import { api } from "~/utils/api";

export default function Projects() {
  const { data: allProjects } = api.project.getAll.useQuery();

  //   const { data: allPreviews } = api.image.getAllProjectPreviews.useQuery();

  return (
    <div className="w-full px-20">
      <div className="text-[23rem]">PROJECTS</div>
      <div className="mb-72 flex flex-wrap gap-10 justify-center">
        {allProjects?.map((e, i) => (
          <ProjectCard project={e} key={i} index={i} />
        ))}
      </div>
    </div>
  );
}
