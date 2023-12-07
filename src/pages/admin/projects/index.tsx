import { useSession } from "next-auth/react";
import Custom404 from "~/pages/404";
import { api } from "~/utils/api";

export default function AdminProjects() {
  const { data: session } = useSession();
  const accessDenied = !session || !session.user.isAdmin;

  const { data: allProjects } = api.project.getAll.useQuery();

  if (accessDenied) {
    return <Custom404 />;
  }

  return (
    <>
      <button> Create</button>
        
    </>
  );
}
