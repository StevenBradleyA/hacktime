import { useRouter } from "next/router";
import LoadingSpinner from "~/app/components/Loading";
import ProjectPage from "~/app/components/Projects/DisplayProjectPage";
import Custom404 from "~/app/404";

export default function ProjectPageCheck() {
  const router = useRouter();
  const { title } = router.query;

  console.log("hello", title);

  console.log("Router is ready:", router.isReady, "Title:", title);

  if (!router.isReady) {
    return <LoadingSpinner size="50" />;
  }

  return (
    <>
      {title && typeof title === "string" ? (
        <ProjectPage title={title} />
      ) : (
        <Custom404 />
      )}
    </>
  );
}
