import { useSession } from "next-auth/react";
import { useState } from "react";
import Custom404 from "~/app/404";
import { api } from "~/trpc/react";
import ModalDialog from "~/app/components/Modal";
import CreateProject from "~/app/components/Admin/Projects/CreateProject";
import EachProjectCard from "~/app/components/Admin/Projects/ProjectCard";
import diagonal from "@public/Graphics/diagonal-1.png";
import plusPlus from "@public/Graphics/Plus-Plus.png";
import Image from "next/image";

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
      <div className="relative mt-10 flex w-full items-center justify-center text-8xl ">
        <div style={{ zIndex: 2 }}>PROJECTS</div>
        <Image
          src={diagonal}
          alt="diagonal art"
          className="absolute right-1/4 opacity-50 "
        />

        <Image
          onClick={openModal}
          src={plusPlus}
          alt="plus graphic"
          className="png-green absolute right-40 w-32 cursor-pointer ease-in-out hover:scale-110"
        />
      </div>
      <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
        <CreateProject closeModal={closeModal} />
      </ModalDialog>

      <div className="my-20 flex w-full gap-10 px-20">
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
