import ProjectCard from "~/components/Projects/DisplayProjects";
import { api } from "~/utils/api";
import Image from "next/image";
import squareGrid from "@public/Graphics/diagonal-2.png";
import DownRightArrow from "~/components/Icons/downRightArrow";

export default function Projects() {
  const { data: allProjects } = api.project.getAll.useQuery();

  return (
    <div className="w-full px-20">
      <div className="mt-5 mb-20 flex justify-between ">
        <div className="project-page-title ">PROJECTS</div>
        <div className="text-hackGray flex flex-col justify-between py-10 ">
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
