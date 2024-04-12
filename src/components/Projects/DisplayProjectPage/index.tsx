import Image from "next/image";
import { api } from "~/utils/api";

export default function ProjectPage({ title }: { title: string }) {
  const { data: project } = api.project.getByTitle.useQuery(title);

  //   todo custom color themes for each project use context just like on keeby
  return (
    <>
      {project && (
        <div className=" mt-5 flex h-[80vh] w-full gap-10  px-24 py-12">
          <div className="flex w-1/3 flex-col justify-center">
            <h1 className="mb-10 text-6xl text-white">
              {project.projectData.title}
            </h1>
            <div className="flex justify-between">
              <p className="w-3/4 flex-wrap break-words text-white">
                {project.projectData.text}
              </p>
              <div>
                <h3 className="mb-1 text-lg">Technology</h3>
                <ul>
                  <li>Next.js</li>
                  <li>tRPC</li>
                  <li>Prisma</li>
                </ul>
              </div>
            </div>
            <a
              href={project.projectData.link as string}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10"
            >
              <button className="rounded-xl bg-white p-4">LAUNCH SITE</button>
            </a>
          </div>

          {project.projectImages.map((e) => (
            <div key={e.id}>
              <Image
                alt="project"
                src={e.link}
                width={1000}
                height={1000}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
