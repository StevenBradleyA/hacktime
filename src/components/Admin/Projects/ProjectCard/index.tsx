import type { Project } from "@prisma/client";
import { api } from "~/utils/api";
import Image from "next/image";
import { motion } from "framer-motion";
import SkullCrossBones from "~/components/Icons/skullCrossBones";
import CrossIcon from "~/components/Icons/cross";
import WizardHat from "~/components/Icons/wizardHat";
import { useState } from "react";
import ModalDialog from "~/components/Modal";
import EditProjectModal from "../EditProject";
import diagonalLong from "@public/Graphics/diagonal-rect-long.png";

interface EachProjectCardProps {
  project: Project;
}

export default function EachProjectCard({ project }: EachProjectCardProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const ctx = api.useContext();

  const { mutate } = api.project.delete.useMutation({
    onSuccess: () => {
      void ctx.project.getAll.invalidate();
    },
  });

  const { data: allPhotos } = api.image.getAllByResourceId.useQuery({
    resourceId: project.id,
  });

  const allPhotoIds = allPhotos?.map((e) => e.id);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="mb-10">
      {!deleteConfirmation && (
        <div className="relative mb-1 flex w-full justify-end gap-5">
          <motion.button
            className="  "
            onClick={() => openEditModal()}
            whileTap={{ scale: 0.95 }}
          >
            <WizardHat />
          </motion.button>
          <motion.button
            className="  "
            onClick={() => setDeleteConfirmation(true)}
            whileTap={{ scale: 0.95 }}
          >
            <CrossIcon />
          </motion.button>
          <div className="png-green absolute left-2 top-0 w-5/6 overflow-hidden opacity-10">
            <Image
              src={diagonalLong}
              alt="diagonal graphic"
              className=" w-full scale-150"
            />
          </div>
        </div>
      )}
      {deleteConfirmation && allPhotoIds && (
        <div className="relative flex w-full justify-end gap-5">
          <motion.button
            onClick={() => mutate({ id: project.id, imageIds: allPhotoIds })}
            whileHover={{
              y: -2,
              transition: { type: "spring", stiffness: 400 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <SkullCrossBones />
          </motion.button>
          <motion.button
            onClick={() => setDeleteConfirmation(false)}
            whileHover={{
              y: -2,
              transition: { type: "spring", stiffness: 400 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            {`C:// abort`}
          </motion.button>
          <div className="png-green absolute left-2 top-0 w-3/4 overflow-hidden opacity-10">
            <Image
              src={diagonalLong}
              alt="diagonal graphic"
              className=" w-full scale-150"
            />
          </div>
        </div>
      )}

      <div className=" w-full rounded-xl bg-black p-10 ">
        <div className="mb-3 text-2xl">{project.title}</div>
        <div className="flex flex-wrap gap-5">
          {allPhotos?.map((e, i) => (
            <Image
              key={i}
              src={e.link}
              alt="project"
              width={500}
              height={500}
              className="h-28 w-32 object-cover"
            />
          ))}
        </div>
        <div className="">{project.text}</div>
      </div>

      {allPhotos && (
        <ModalDialog isOpen={isEditModalOpen} onClose={closeEditModal}>
          <EditProjectModal
            project={project}
            closeModal={closeEditModal}
            images={allPhotos}
          />
        </ModalDialog>
      )}
    </div>
  );
}
