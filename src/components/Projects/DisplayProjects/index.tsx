import type { Project } from "@prisma/client";
import { api } from "~/utils/api";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { data: previewImage } = api.image.getAllProjectPreviews.useQuery({
    resourceId: project.id,
  });

  //   console.log(previewImage);
  return (
    <div className="flex flex-col w-1/2 mb-10 ">
      {previewImage?.[0] && (
        <Image
          src={previewImage[0].link}
          alt="project preview"
          width={500}
          height={500}
          className="w-full rounded-3xl"
        />
      )}
      <div></div>
      <div className=" mt-5 text-5xl">{project.title}</div>
    </div>
  );
}
