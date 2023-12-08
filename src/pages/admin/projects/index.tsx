import { useSession } from "next-auth/react";
import { useState } from "react";
import Custom404 from "~/pages/404";
import { api } from "~/utils/api";
import PlusIcon from "~/components/Icons/plus";
import SkullCrossBones from "~/components/Icons/skullCrossBones";
import { motion } from "framer-motion";
import ModalDialog from "~/components/Modal";
import CreateProject from "~/components/Projects/CreateProject";

export default function AdminProjects() {
  const { data: session } = useSession();
  const accessDenied = !session || !session.user.isAdmin;

  const { data: allProjects } = api.project.getAll.useQuery();
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <CreateProject />
      </ModalDialog>

      {allProjects &&
        allProjects.length > 0 &&
        allProjects.map((e, i) => (
          <div key={i} className="w-1/3">
            {!deleteConfirmation && (
              <motion.button
                className="flex w-full justify-end text-orange-400 "
                onClick={() => setDeleteConfirmation(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlusIcon />
              </motion.button>
            )}
            {deleteConfirmation && (
              <div className="flex w-full justify-end gap-5 text-orange-400">
                {/* <button onClick={() => mutate({ id: e.id })}>Yes</button> */}
                <button onClick={() => setDeleteConfirmation(false)}>No</button>
              </div>
            )}

            <div className="relative mb-10  rounded-xl bg-black p-10 text-white">
              <div className="mb-5 flex justify-between">
                <div className="text-sky-300">{e.title}</div>
                <div className="text-pink-300">{e.text}</div>
              </div>
              <div>{e.text}</div>
            </div>
          </div>
        ))}
    </>
  );
}
