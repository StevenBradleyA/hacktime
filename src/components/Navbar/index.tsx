import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import CircleNav from "../Icons/CircleNav";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();
  const [isHome, setIsHome] = useState(false);
  const [isAboutUs, setIsAboutUs] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isContactUs, setIsContactUs] = useState(false);
  const [isSteven, setIsSteven] = useState(false);
  const [isZaviar, setIsZaviar] = useState(false);

  useEffect(() => {
    setIsHome(router.pathname === "/");
    setIsAboutUs(router.pathname === "/about-us");
    setIsProjects(router.pathname === "/projects");
    setIsContactUs(router.pathname === "/contact");
    setIsSteven(router.pathname === "/steven");
    setIsZaviar(router.pathname === "/zaviar");

    const handleRouteChange = (url: string) => {
      setIsHome(url === "/");
      setIsAboutUs(url === "/about-us");
      setIsProjects(url === "/projects");
      setIsContactUs(url === "/contact");
      setIsSteven(url === "/steven");
      setIsZaviar(url === "/zaviar");
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    },
    [isMenuOpen, handleClose],
  );

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen, handleClose, handleOutsideClick]);

  // TODO add menu hover animations for clickable links on the drop down
  // todo add a indicator for when the menu is open or closed
  // todo sound effects????

  return (
    <nav
      className=" mb-5 flex items-center justify-between gap-10 px-20 pt-10 font-aeonik text-lg "
      aria-label="Main Navigation -z-30"
    >
      <Link href="/" aria-label="Home" className="text-4xl">
        HackTime
      </Link>
      <div className="relative flex gap-5">
        <Link href="/" aria-label="Home">
          <button className="rounded-3xl bg-white px-6 py-2">LET'S CHAT</button>
        </Link>

        <button
          onClick={toggleMenu}
          ref={menuButtonRef}
          className="rounded-3xl bg-white px-6 py-2"
        >
          MENU
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              className="absolute z-30 mt-16 w-full flex-col text-3xl"
              initial={{ opacity: 1, y: 100 }}
              key={"menu-parent"}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.75,
                  type: "spring",
                  stiffness: 100,
                },
              }}
              exit={{
                opacity: 0,
                y: 125,
                transition: {
                  ease: "easeOut",
                  duration: 1.5,
                  y: { duration: 2 },
                },
              }}
            >
              <motion.div
                className="first-menu flex flex-col gap-5 rounded-2xl bg-white p-5"
                key={"menu-top"}
                initial={{ opacity: 1, rotate: -5 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{
                  opacity: 0,
                  rotate: 5,
                  transition: {
                    ease: "easeOut",
                    duration: 1.5,
                    y: { duration: 2 },
                  },
                }}
              >
                <Link href="/" aria-label="Home" onClick={handleClose}>
                  <div className="flex items-center justify-between">
                    <motion.button className="flex justify-start">
                      HOME
                    </motion.button>
                    {isHome && <CircleNav />}
                  </div>
                </Link>
                <Link
                  href="/about-us"
                  aria-label="projects"
                  onClick={handleClose}
                >
                  <div className="flex items-center justify-between">
                    <motion.button className="flex justify-start">
                      ABOUT US
                    </motion.button>
                    {isAboutUs && <CircleNav />}
                  </div>
                </Link>
                <Link
                  href="/projects"
                  aria-label="projects"
                  onClick={handleClose}
                >
                  <div className="flex items-center justify-between">
                    <motion.button className="flex justify-start">
                      PROJECTS
                    </motion.button>
                    {isProjects && <CircleNav />}
                  </div>
                </Link>
                <Link
                  href="/contact"
                  aria-label="contact"
                  onClick={handleClose}
                >
                  <div className="flex items-center justify-between">
                    <motion.button className="flex justify-start">
                      CONTACT
                    </motion.button>
                    {isContactUs && <CircleNav />}
                  </div>
                </Link>
              </motion.div>
              <motion.div
                className="second-menu mt-5 flex flex-col gap-5 rounded-2xl bg-white p-5"
                key={"menu-bottom"}
                initial={{ opacity: 1, rotate: 5 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{
                  opacity: 0,
                  rotate: -5,
                  transition: {
                    ease: "easeOut",
                    duration: 1.5,
                    y: { duration: 2 },
                  },
                }}
              >
                <div>Meet the Team</div>
                <Link
                  href="/steven"
                  aria-label="Steven Profile"
                  onClick={handleClose}
                >
                  <div className="flex items-center justify-between">
                    <div className="relative flex">
                      <div> {`// Steven`}</div>
                      <div className="absolute -right-5 bottom-5 text-sm ">
                        00
                      </div>
                    </div>
                    {isSteven && <CircleNav />}
                  </div>
                </Link>
                <Link
                  href="/zaviar"
                  aria-label="Zaviar Profile"
                  onClick={handleClose}
                >
                  <div className="flex items-center justify-between">
                    <div className="relative flex">
                      <div> {`// Zaviar`}</div>
                      <div className="absolute -right-5 bottom-5 text-sm ">
                        01
                      </div>
                    </div>
                    {isZaviar && <CircleNav />}
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

/*
 <div className="flex justify-center">
        <Link href="/" aria-label="Home">
          <div className="flex flex-col items-center justify-center">
            <div className=" mono: ['var(--font-roboto-mono)'],  text-center text-5xl">
              HackTime
            </div>

            <div
              className="border-t-2  text-xs"
              style={{ borderColor: "#00FF99" }}
            >
              01101000 01100001 01100011 01101011
            </div>
            <div className="text-xs">01110100 01101001 01101101 01100101</div>
          </div>
        </Link>
      </div>

  <div className="flex gap-10">
        <Link href="/steven" aria-label="Pricing">
          <div className="flex flex-col">
            <div className=" relative top-2 flex justify-end text-xs"> 00</div>
            <div className="flex items-center gap-2 text-2xl">
              <div className=" relative bottom-1 ">{`//`}</div>
              <div className="">Steven</div>
            </div>
          </div>
        </Link>

        <Link href="/zaviar" aria-label="Feature">
          <div className="flex flex-col">
            <div className=" relative top-2 flex justify-end text-xs"> 01</div>
            <div className="flex items-center justify-center gap-2 text-2xl">
              <div className="relative bottom-1 ">{`//`}</div>
              <div>Zaviar</div>
            </div>
          </div>
        </Link>
      </div>



*/
