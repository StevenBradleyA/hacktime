import type { Project } from "@prisma/client";
import { api } from "~/utils/api";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  index: number;
}
const decimalToBinary = (number: number): string => {
  return (number >>> 0).toString(2);
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { data: previewImage } = api.image.getAllProjectPreviews.useQuery({
    resourceId: project.id,
  });

  //   console.log(previewImage);
  const binaryIndex = decimalToBinary(index);
  return (
    <div className="mb-10 flex w-[48%] flex-col  ">
      {previewImage?.[0] && (
        <Image
          src={previewImage[0].link}
          alt="project preview"
          width={500}
          height={500}
          className="w-full rounded-3xl object-cover h-[30rem]"
        />
      )}
      <div>{binaryIndex}</div>
      <div className=" mt-5 text-5xl">{project.title}</div>
    </div>
  );
}
