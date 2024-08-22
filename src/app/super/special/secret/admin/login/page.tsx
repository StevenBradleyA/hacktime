import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/trpc/react";
import { hash } from "bcryptjs";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import hacktime from "@public/Gifs/hackerman-gif.gif";
import matrix from "@public/Gifs/matrix.gif";

export default function SuperSpecialSecretAdminLogin() {
  const [pass, setPass] = useState<string>("");
  const router = useRouter();
  const { data: sessionData, update } = useSession();

  const isAdmin = sessionData && sessionData.user.isAdmin;
  const handleGoogleSignIn = async () => {
    await signIn("google");
  };
  const handleGoogleSignOut = async () => {
    await signOut();
  };

  const { mutate } = api.user.grantAdmin.useMutation({
    onSuccess: async (res) => {
      await update();
      if (res === "Success") void router.push("/admin");
      if (res === "Incorrect") return;
      if (res === "Error") return;
    },
  });

  const hackerHash = async () => {
    const hashPass = await hash(pass, 6);
    mutate(hashPass);
  };

  return (
    <div className="bg-hackingtime absolute top-0 z-10 flex h-full w-full justify-center p-20 text-green-500 ">
      <div className=" relative z-0 mt-40 flex w-2/3 flex-col items-center justify-center rounded-2xl bg-black  ">
        {sessionData === null ? (
          <Image
            src={hacktime}
            alt="hacking time"
            className="z-50 cursor-pointer "
            onClick={() => void handleGoogleSignIn()}
          />
        ) : (
          <Image src={hacktime} alt="hacking time" className="z-50" />
        )}
        <Image
          src={matrix}
          alt="hacking time"
          className="matrix-time absolute left-0 top-0 h-full w-full rounded-2xl opacity-50 "
        />

        {sessionData && !isAdmin && (
          <>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="z-10 mb-5 rounded border border-green-500 bg-black px-4 py-2 text-green-500 placeholder-green-500 focus:border-green-700 focus:outline-none"
              placeholder="It's Hacking Time"
            />
            <button
              onClick={() => void hackerHash()}
              className="z-10 rounded-2xl bg-green-500 px-6 py-1 text-black  hover:bg-keeby hover:text-green-500"
            >
              {`C:\\\\> Hack`}
            </button>
          </>
        )}
        {sessionData && isAdmin && (
          <button
            onClick={() => void handleGoogleSignOut()}
            className="z-10 mt-5 rounded-2xl bg-green-500 px-6 py-1 text-black  hover:bg-keeby hover:text-green-500"
          >
            {`C:\\\\> Log out`}
          </button>
        )}
      </div>
    </div>
  );
}
