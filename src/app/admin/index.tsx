import { useSession } from "next-auth/react";
import Custom404 from "../404";
import { api } from "~/trpc/react";
import Image from "next/image";
import Link from "next/link";
import anonymous from "@public/Admin/admin-green.png";
import adminTitle from "@public/Admin/admin-vert-title.png";
import diagonal from "@public/Graphics/diagonal-1.png";
import dots from "@public/Graphics/dots-rect.png";
import smile from "@public/Graphics/hacktime-logo.png";
import { useState } from "react";
import CrossIcon from "~/app/components/Icons/cross";
import SkullCrossBones from "~/app/components/Icons/skullCrossBones";
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
      <div className="relative w-1/3">
        <Image
          src={adminTitle}
          alt="admin title"
          className="png-light-gray absolute -left-44"
        />
      </div>

      <div className="relative w-full ">
        <Image
          src={anonymous}
          alt="admin logo"
          className="absolute left-20 top-20 w-44 "
        />
        <Image
          src={diagonal}
          alt="admin logo"
          className="absolute left-20 top-64 w-44 "
        />
      </div>

      <div className="relative w-full "></div>

      <div className="relative mb-10 flex w-full">
        <Link href="/admin/projects" aria-label="admin projects">
          <Image
            src={dots}
            alt="dots"
            className="absolute right-36 top-44 w-72 opacity-30"
          />
          <Image
            src={smile}
            alt="admin logo"
            className="png-light-gray absolute right-20 top-20 w-44 "
          />
          <h2 className=" absolute right-60 top-64 w-44 text-6xl ">PROJECTS</h2>
        </Link>
        <Link href="/admin/customers" aria-label="admin customers">
          <Image
            src={dots}
            alt="dots"
            className="absolute right-36 top-[35rem] w-72 opacity-30"
          />
          <Image
            src={smile}
            alt="admin logo"
            className="png-light-gray absolute right-20 top-[29rem] w-44 "
          />
          <h2 className=" absolute right-60 top-[40rem] w-44 text-6xl ">
            CUSTOMERS
          </h2>
        </Link>
        {/* <button className="absolute right-72 top-0 bg-purple-500"></button> */}
      </div>
      {allRequests &&
        allRequests.length > 0 &&
        allRequests.map((e, i) => (
          <div key={i} className="w-1/3">
            {!deleteConfirmation && (
              <motion.button
                className="flex w-full justify-end"
                onClick={() => setDeleteConfirmation(true)}
              >
                <CrossIcon />
              </motion.button>
            )}
            {deleteConfirmation && (
              <div className="flex w-full justify-end gap-5 ">
                <motion.button
                  onClick={() => mutate({ id: e.id })}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SkullCrossBones />
                </motion.button>
                <motion.button
                  onClick={() => setDeleteConfirmation(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {`C:// abort`}
                </motion.button>
              </div>
            )}

            <div className="relative mb-10 mt-1  rounded-xl bg-black p-10 text-white">
              <div className="mb-5 flex justify-between">
                <div className="text-green-500">{e.email}</div>
                <div className="text-hackGray">{e.budget}</div>
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
