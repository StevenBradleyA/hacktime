import { useSession } from "next-auth/react";
import Custom404 from "~/pages/404";

export default function AdminProjects() {
  const { data: session } = useSession();
  const accessDenied = !session || !session.user.isAdmin;

  if (accessDenied) {
    return <Custom404 />;
  }

  return (
    <>
      <div>projects here</div>
      <button> Create</button>
    </>
  );
}
