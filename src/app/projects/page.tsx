import ProjectCard from "~/app/components/Projects/DisplayProjects";
import { api } from "~/trpc/react";
import Image from "next/image";
import squareGrid from "@public/Graphics/diagonal-2.png";
import DownRightArrow from "~/app/components/Icons/downRightArrow";

export default function Projects() {
  const { data: allProjects } = api.project.getAll.useQuery();

  return (
    <div className="w-full px-20">
      <div className="mb-20 mt-5 flex justify-between ">
        <div className="project-page-title ">PROJECTS</div>
        <div className="flex flex-col justify-between py-10 text-hackGray ">
          <Image
            src={squareGrid}
            alt="square-graphic"
            className="project-page-title-icons"
          />
          <DownRightArrow />
        </div>
      </div>
      <div className="mb-72 flex flex-wrap justify-center gap-10">
        {allProjects?.map((e, i) => (
          <ProjectCard project={e} key={i} index={i} />
        ))}
      </div>
    </div>
  );
}
