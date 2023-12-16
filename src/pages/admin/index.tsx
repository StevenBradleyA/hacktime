import { useSession } from "next-auth/react";
import Custom404 from "../404";
import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import projectLogo from "@public/Admin/projects.png";
import anonymous from "@public/Admin/admin-green.png";
import adminTitle from "@public/Admin/admin-vert-title.png";
import diagonal from "@public/Graphics/diagonal-1.png"
import { useState } from "react";
import CrossIcon from "~/components/Icons/cross";
import SkullCrossBones from "~/components/Icons/skullCrossBones";
import { motion } from "framer-motion";

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

  // TODO change styling to match off white retro futur theme
  // get rid of pixel title
  // add vertical bars going down right side below image
  // maybe add XXX svg or XX face next to title make it cool
  // restyle later tho end game once live prob

  return (
    <>
      <div className="relative h-10 w-1/3">
        <Image
          src={adminTitle}
          alt="admin title"
          className="png-light-gray absolute -left-40"
        />
      </div>

      <div className="relative w-full">
        <Image
          src={anonymous}
          alt="admin logo"
          className="absolute left-20 top-0 w-44 "
        />
        <Image
          src={diagonal}
          alt="admin logo"
          className="absolute left-20 top-44 w-44 "

        />
      </div>

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
              <motion.button
                className="flex w-full justify-end text-orange-400 "
                onClick={() => setDeleteConfirmation(true)}
                whileHover={{
                  y: -2,
                  transition: { type: "spring", stiffness: 400 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <CrossIcon />
              </motion.button>
            )}
            {deleteConfirmation && (
              <div className="flex w-full justify-end gap-5 text-orange-400">
                <motion.button
                  onClick={() => mutate({ id: e.id })}
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

            <div className="relative mb-10 mt-1  rounded-xl bg-black p-10 text-white">
              <div className="mb-5 flex justify-between">
                <div className="text-sky-300">{e.email}</div>
                <div className="text-pink-300">{e.budget}</div>
              </div>
              <div>{e.text}</div>
            </div>
          </div>
        ))}
      {allRequests && allRequests.length === 0 && (
        <div className="text-xl text-orange-400"> no requests :/ </div>
      )}
    </>
  );
}
