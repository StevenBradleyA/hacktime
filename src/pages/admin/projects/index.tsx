import { useSession } from "next-auth/react";
import { useState } from "react";
import Custom404 from "~/pages/404";
import { api } from "~/utils/api";
import PlusIcon from "~/components/Icons/plus";
import SkullCrossBones from "~/components/Icons/skullCrossBones";

export default function AdminProjects() {
  const { data: session } = useSession();
  const accessDenied = !session || !session.user.isAdmin;

  const { data: allProjects } = api.project.getAll.useQuery();
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

  if (accessDenied) {
    return <Custom404 />;
  }

  return (
    <>
      <div className="mt-10 text-6xl ">PROJECTS</div>
      <button> Create</button>

      {allProjects &&
        allProjects.length > 0 &&
        allProjects.map((e, i) => (
          <div key={i} className="w-1/3">
            {!deleteConfirmation && (
              <button
                className="flex w-full justify-end text-orange-400 "
                onClick={() => setDeleteConfirmation(true)}
              >
                <PlusIcon />
                
              </button>
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
