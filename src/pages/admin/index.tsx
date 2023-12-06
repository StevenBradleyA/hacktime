import { useSession } from "next-auth/react";
import Custom404 from "../404";
import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";

export default function Admin() {
  const { data: session } = useSession();
  const accessDenied = !session || !session.user.isAdmin;

  const { data: allRequests } = api.request.getAll.useQuery();

  if (accessDenied) {
    return <Custom404 />;
  }

  return (
    <>
      <div className="mt-10 text-6xl"> Requests</div>
      <div className="relative mb-10 flex w-full bg-red-400">
        <Link href="/admin/projects" aria-label="admin projects">
          <button className="absolute right-72 top-0 rounded-2xl bg-black px-6 py-2 ">
            Project poggers
          </button>
        </Link>
        <button className="absolute right-72 top-0"></button>
      </div>
      {allRequests &&
        allRequests.length > 0 &&
        allRequests.map((e, i) => (
          <div className="mb-10 w-1/3 rounded-xl bg-black p-10" key={i}>
            <div className="mb-5 flex justify-between">
              <div>{e.email}</div>
              <div>{e.budget}</div>
            </div>
            <div>{e.text}</div>
          </div>
        ))}
    </>
  );
}
