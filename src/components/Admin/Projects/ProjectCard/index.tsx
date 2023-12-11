import type { Project } from "@prisma/client";
import WizardHat from "~/components/Icons/wizardHat";
import { motion } from "framer-motion";
import { api } from "~/utils/api";
import Image from "next/image";

interface EachProjectCardProps {
  project: Project;
  deleteConfirmation: boolean;
}

export default function EachProjectCard({
  project,
  deleteConfirmation,
}: EachProjectCardProps) {
  //   const { mutate } = api.project.delete.useMutation({
  //     onSuccess: () => {
  //       void ctx.project.getAll.invalidate();
  //     },
  //   });

  const { data: allPhotos } = api.image.getAllByResourceId.useQuery({
    resourceId: project.id,
  });

  return (
    <>
      <div className="mb-10 rounded-xl bg-black p-10 ">
        <div className="mb-3 text-2xl">{project.title}</div>
        <div className="flex flex-wrap gap-5">
          {allPhotos?.map((e, i) => (
            <Image
              key={i}
              src={e.link}
              alt="project"
              width={500}
              height={500}
              className="w-32 h-28 object-cover"
            />
          ))}
        </div>
        <div className="">{project.text}</div>
      </div>
    </>
  );
}
