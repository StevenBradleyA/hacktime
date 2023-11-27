import { useSession } from "next-auth/react";
import Custom404 from "../404";
import { api } from "~/utils/api";

export default function Admin() {
  const { data: session } = useSession();
  const accessDenied = !session || !session.user.isAdmin;

  const { data: allRequests } = api.request.getAll.useQuery();

  if (accessDenied) {
    return <Custom404 />;
  }

  console.log(allRequests);
  return (
    <>
      <div className="my-10 text-6xl"> Requests</div>

      {allRequests &&
        allRequests.length > 0 &&
        allRequests.map((e, i) => (
          <div className="w-1/3 rounded-xl bg-black p-10" key={i}>
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
