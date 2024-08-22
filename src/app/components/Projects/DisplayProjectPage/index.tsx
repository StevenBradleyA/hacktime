import Image from "next/image";
import { useEffect, useRef } from "react";
import { api } from "~/trpc/react";
import { motion } from "framer-motion";
import hacktime from "@public/Graphics/hacktime-logo.png";

export default function ProjectPage({ title }: { title: string }) {
  const { data: project } = api.project.getByTitle.useQuery(title);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  //   todo custom color themes for each project use context just like on keeby

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        // console.log("Scrolled up");
        if (scrollRef.current)
          scrollRef.current.scrollLeft += e.deltaY + e.deltaX;
      } else if (e.deltaY > 0) {
        // console.log("Scrolled down");
        if (scrollRef.current)
          scrollRef.current.scrollLeft += e.deltaY + e.deltaX;
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      {project && (
        <div
          className=" mt-5 flex h-[80vh] w-full gap-10  overflow-x-auto  px-24 py-12"
          id="scrollable-container"
          ref={scrollRef}
        >
          <div className="flex w-[600px] flex-shrink-0 flex-col justify-center">
            <h1 className="mb-10 text-6xl text-white ">
              {project.projectData.title}
            </h1>
            <div className="flex gap-20">
              <p className=" flex w-3/4 flex-wrap break-words   break-all text-white">
                {project.projectData.text}
              </p>
              <div className="flex  w-1/4 flex-col">
                <h3 className="mb-1 text-lg">Technology</h3>
                <ul className="text-white">
                  <li>Next.js</li>
                  <li>tRPC</li>
                  <li>Prisma</li>
                  <li>AWS S3</li>
                </ul>
              </div>
            </div>

            <a
              href={project.projectData.link as string}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10"
            >
              <button className="live-site-button flex items-center gap-2 rounded-3xl bg-darkGray py-4 pl-6">
                <Image
                  alt="hacktime-logo"
                  src={hacktime}
                  className="live-site-button-circle w-6 object-cover "
                />

                <span className="live-site-button-text">LAUNCH SITE</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="live-site-button-arrow w-6 rounded-full bg-black p-1"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </a>
          </div>
          <div className="flex gap-20">
            {project.projectImages.map((e) => (
              <motion.div
                key={e.id}
                className="w-[1250px] flex-shrink-0 "
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.5,
                }}
                viewport={{ root: scrollRef }}
              >
                <Image
                  alt="project"
                  src={e.link}
                  width={2000}
                  height={2000}
                  className="h-full w-full rounded-3xl object-cover "
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
