import { useSession } from "next-auth/react";
import Custom404 from "../404";
import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import projectLogo from "@public/Admin/projects.png";
import adminLogo from "@public/Admin/admin-title.png";
import { useState } from "react";
import CrossIcon from "~/components/Icons/cross";
import SkullCrossBones from "~/components/Icons/skullCrossBones";

export default function Admin() {
  const { data: session } = useSession();
  const accessDenied = !session || !session.user.isAdmin;

  const { data: allRequests } = api.request.getAll.useQuery();

  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

  const ctx = api.useContext();

  const { mutate } = api.request.delete.useMutation({
    onSuccess: () => {
      void ctx.request.getAll.invalidate();
    },
  });

  if (accessDenied) {
    return <Custom404 />;
  }

  return (
    <>
      <Image src={adminLogo} alt="admin" className="w-1/4" />
      <div className="relative mb-10 flex w-full">
        <Link href="/admin/projects" aria-label="admin projects">
          <Image
            src={projectLogo}
            alt="projects"
            className="absolute right-32 w-96"
          />
        </Link>
        <button className="absolute right-72 top-0"></button>
      </div>
      {allRequests &&
        allRequests.length > 0 &&
        allRequests.map((e, i) => (
          <div key={i} className="w-1/3">
            {!deleteConfirmation && (
              <button
                className="flex w-full justify-end text-orange-400 "
                onClick={() => setDeleteConfirmation(true)}
              >
                <CrossIcon />
              </button>
            )}
            {deleteConfirmation && (
              <div className="flex w-full justify-end gap-5 text-orange-400">
                <button onClick={() => mutate({ id: e.id })}>
                  <SkullCrossBones />
                </button>
                <button onClick={() => setDeleteConfirmation(false)}>
                  {`C:// abort`}
                </button>
              </div>
            )}

            <div className="relative mb-10 mt-1  rounded-xl bg-black p-10 text-white">
              <div className="mb-5 flex justify-between">
                <div className="text-sky-300">{e.email}</div>
                <div className="text-pink-300">{e.budget}</div>
              </div>
              <div>{e.text}</div>
            </div>
          </div>
        ))}
    </>
  );
}
