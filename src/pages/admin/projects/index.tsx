import { useSession } from "next-auth/react";
import { useState } from "react";
import Custom404 from "~/pages/404";
import { api } from "~/utils/api";
import PlusIcon from "~/components/Icons/plus";
import SkullCrossBones from "~/components/Icons/skullCrossBones";
import { motion } from "framer-motion";
import ModalDialog from "~/components/Modal";
import CreateProject from "~/components/Projects/CreateProject";
import CrossIcon from "~/components/Icons/cross";
import WizardHat from "~/components/Icons/wizardHat";

export default function AdminProjects() {
  const { data: session } = useSession();
  const accessDenied = !session || !session.user.isAdmin;

  const { data: allProjects } = api.project.getAll.useQuery();
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  if (accessDenied) {
    return <Custom404 />;
  }
  // in the future could have different layouts for projects so they look unique
  return (
    <>
      <div className="relative mt-10 flex items-center justify-center text-6xl ">
        PROJECTS
        <motion.button
          className="absolute -right-96 rounded-2xl bg-black px-6 py-1"
          whileHover={{ y: -5, transition: { type: "spring", stiffness: 400 } }}
          whileTap={{ scale: 0.95 }}
          onClick={openModal}
        >
          <PlusIcon />
        </motion.button>
      </div>
      <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
        <CreateProject closeModal={closeModal} />
      </ModalDialog>
      <ModalDialog isOpen={isEditModalOpen} onClose={closeEditModal}>
        yoyoyoyoyoy edit modal time
      </ModalDialog>

      {allProjects &&
        allProjects.length > 0 &&
        allProjects.map((e, i) => (
          <div key={i} className="w-1/3">
            {!deleteConfirmation && (
              <div className="flex w-full items-center justify-end">
                <motion.button
                  onClick={openEditModal}
                  whileHover={{
                    y: -2,
                    transition: { type: "spring", stiffness: 400 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="mb-1"
                >
                  <WizardHat />
                </motion.button>
                <motion.button
                  onClick={() => setDeleteConfirmation(true)}
                  whileHover={{
                    y: -2,
                    transition: { type: "spring", stiffness: 400 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CrossIcon />
                </motion.button>
              </div>
            )}
            {deleteConfirmation && (
              <div className="flex w-full justify-end gap-5 ">
                <motion.button
                  //   onClick={() => mutate({ id: e.id })}
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
              </div>
            )}

            <div className="mb-10 rounded-xl bg-black p-10 ">
              <div className="mb-3 text-2xl">{e.title}</div>
              <div className="">{e.text}</div>
            </div>
          </div>
        ))}
    </>
  );
}
