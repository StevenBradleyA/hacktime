import ProjectCard from "~/components/Projects/DisplayProjects";
import { api } from "~/utils/api";

export default function Projects() {
  const { data: allProjects } = api.project.getAll.useQuery();

  //   const { data: allPreviews } = api.image.getAllProjectPreviews.useQuery();

  return (
    <div>
      <div className="text-[23rem]">PROJECTS</div>
      <div className="mb-72 flex gap-10">
        {allProjects?.map((e, i) => (
          <ProjectCard project={e} key={i} index={i} />
        ))}
      </div>
    </div>
  );
}
