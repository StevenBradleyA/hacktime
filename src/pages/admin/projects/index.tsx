import { useSession } from "next-auth/react";
import { useState } from "react";
import Custom404 from "~/pages/404";
import { api } from "~/utils/api";
import PlusIcon from "~/components/Icons/plus";
import SkullCrossBones from "~/components/Icons/skullCrossBones";
import { motion } from "framer-motion";
import ModalDialog from "~/components/Modal";
import CreateProject from "~/components/Admin/Projects/CreateProject";
import CrossIcon from "~/components/Icons/cross";
import WizardHat from "~/components/Icons/wizardHat";
import EachProjectCard from "~/components/Admin/Projects/ProjectCard";

export default function AdminProjects() {
  const { data: session } = useSession();
  const accessDenied = !session || !session.user.isAdmin;

  const { data: allProjects } = api.project.getAll.useQuery();

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
        <CreateProject closeModal={closeModal} />
      </ModalDialog>
      
      <div className="mt-5 flex w-full gap-10 px-20">
        {allProjects &&
          allProjects.length > 0 &&
          allProjects.map((e, i) => (
            <div key={i} className="w-1/3">
              <EachProjectCard project={e} />
            </div>
          ))}
      </div>
    </>
  );
}
