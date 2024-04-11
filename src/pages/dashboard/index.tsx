import { signIn, useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import { hash } from "bcryptjs";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { data: sessionData, update } = useSession();
  const [pass, setPass] = useState<string>("");
  const [incorrectPass, setIncorrectPass] = useState<boolean>(false);

  const handleGoogleSignIn = async () => {
    await signIn("google");
  };

  const { mutate } = api.user.grantCustomer.useMutation({
    onSuccess: async (res) => {
      await update();
      if (res === "Success") {
        toast.success("Dashboard Access Granted!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      if (res === "Incorrect") setIncorrectPass(true);
      if (res === "Error") return;
    },
  });

  const hackerHash = async () => {
    const hashPass = await hash(pass, 6);
    mutate(hashPass);
  };

  return (
    <>
      {!sessionData && (
        <button
          onClick={() => void handleGoogleSignIn()}
          className="mt-10 rounded-md bg-black px-6 py-2"
        >
          Please Sign In To Manage your customer account :D
        </button>
      )}

      {sessionData && sessionData.user && !sessionData.user.isCustomer && (
        <>
          <div>Hello {sessionData.user.name}</div>
          <div>
            to become a customer please fill out this form and input the code we
            emailed you.
          </div>

          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="z-10 mb-5 rounded border border-green-500 bg-black px-4 py-2 text-green-500 placeholder-green-500 focus:border-green-700 focus:outline-none"
            placeholder="It's Hacking Time"
          />
          {incorrectPass && (
            <div className="text-red-500">incorrect password</div>
          )}
          <button
            onClick={() => void hackerHash()}
            className="z-10 rounded-2xl bg-green-500 px-6 py-1 text-black  hover:bg-keeby hover:text-green-500"
          >
            {`C:\\\\> Hack`}
          </button>
        </>
      )}
      {sessionData && sessionData.user && sessionData.user.isCustomer && (
        <>
          <div>
            hey this is the customer dashboard where they can pay bills see
            receipts etc.
          </div>
          <div>we need to setup subscriptions via stripe</div>
          <div>
            also need to update the db to save transactions associated with a
            user so they can view their bills{" "}
          </div>
        </>
      )}
    </>
  );
}
