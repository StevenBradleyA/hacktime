import type { Project } from "@prisma/client";
import { api } from "~/utils/api";
import Image from "next/image";
import rectangle from "@public/Graphics/diagonal-1.png";
import RightArrow from "~/components/Icons/rightArrow";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isHovered, setIsHovered] = useState(false);

  const binaryIndex = decimalToBinary(index);

  return (
    <motion.div
      className="mb-10 flex w-[48%] cursor-pointer flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {previewImage?.[0] && (
        <div className="overflow-hidden rounded-3xl">
          <Image
            src={previewImage[0].link}
            alt="project preview"
            width={1000}
            height={1000}
            className="h-[25vw] w-full rounded-3xl object-cover transition-transform  hover:scale-105 "
          />
        </div>
      )}
      <div className="flex gap-5  ">
        <Image src={rectangle} alt="rectangle graphic" className="w-20" />
        <div className="text-xl">{binaryIndex}</div>
      </div>
      <div className="relative flex h-20 w-full">
        <AnimatePresence mode="wait">
          {isHovered ? (
            <motion.div className="flex">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 10 }}
              >
                <RightArrow />
              </motion.div>
              <motion.div
                key="hovered"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 8 }}
                className="flex text-5xl"
              >
                {project.title}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="notHovered"
              initial={{ x: 80 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 10 }}
              className="text-5xl"
            >
              {project.title}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
