"use client";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import CircleNav from "../Icons/CircleNav";
import MenuArrow from "../Icons/menuArrow";
import ModalDialog from "../Modal";
import ContactForm from "../ContactForm";
import { useSession } from "next-auth/react";
import hacktime from "@public/Graphics/hacktime-logo.png";

export default function Navigation() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  const { data: sessionData } = useSession();
  const isAdmin = sessionData && sessionData.user.isAdmin;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isHome, setIsHome] = useState<boolean>(false);
  const [isAboutUs, setIsAboutUs] = useState<boolean>(false);
  const [isProjects, setIsProjects] = useState<boolean>(false);
  const [isContactUs, setIsContactUs] = useState<boolean>(false);
  const [isSteven, setIsSteven] = useState<boolean>(false);
  const [isZaviar, setIsZaviar] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsHome(pathname === "/");
    setIsAboutUs(pathname === "/about-us");
    setIsProjects(pathname === "/projects");
    setIsContactUs(pathname === "/contact");
    setIsSteven(pathname === "/steven");
    setIsZaviar(pathname === "/zaviar");
  }, [pathname]);

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


  return (
    <nav
      className=" sticky top-0 z-50 flex items-center justify-between gap-10 px-24 py-12 font-aeonik text-lg "
      aria-label="Main Navigation -z-30"
    >
      <Link href="/" aria-label="Home" className="text-4xl">
        HackTime
      </Link>
      <div className="relative flex gap-5 ">
        {isAdmin && (
          <Link href="/admin" aria-label="Home">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex w-12 items-center justify-center overflow-hidden rounded-full p-2"
            >
              <Image
                className=" png-green scale-150 object-cover"
                src={hacktime}
                alt="hacktime"
                width={200}
                height={200}
              />
            </motion.button>
          </Link>
        )}
        {sessionData && sessionData.user ? (
          <Link href="/dashboard" aria-label="Home">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-3xl bg-darkGray px-6 py-2"
            >{`DASHBOARD`}</motion.button>
          </Link>
        ) : (
          <motion.button
            className="nav-talk-button flex items-center gap-2 rounded-3xl  py-3 pr-6"
            onClick={openModal}
          >
            <svg
              className="nav-talk-button-arrow w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
              ></path>
            </svg>
            <span className="nav-talk-button-text">{`LET'S CHAT`}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="nav-talk-button-circle w-2"
              viewBox="0 0 32 32"
            >
              <circle cx="16" cy="16" r="16" />
            </svg>
          </motion.button>
        )}
        <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
          <ContactForm closeModal={closeModal} />
        </ModalDialog>

        <motion.button
          onClick={toggleMenu}
          ref={menuButtonRef}
          className="nav-menu-button flex items-center gap-2 rounded-3xl  bg-white px-6 py-2"
        >
          <span className="nav-menu-button-text">
            {`${isMenuOpen ? "CLOSE" : "MENU"}`}
          </span>
          {!isMenuOpen ? (
            <svg
              className="nav-menu-button-arrow w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
              ></path>
            </svg>
          ) : (
            <Image
              alt="hacktime-logo"
              className="nav-menu-button-cross png-green w-4"
              src={hacktime}
            />
          )}
        </motion.button>

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
                  <motion.div className="menu-slide-container flex w-full items-center justify-between  ">
                    <button className="menu-slide-text">HOME</button>
                    <button className="menu-slide-text-clone ">HOME</button>
                    {!isHome && <MenuArrow />}
                    {isHome && <CircleNav />}
                  </motion.div>
                </Link>

                <Link
                  href="/about-us"
                  aria-label="projects"
                  onClick={handleClose}
                >
                  <motion.div className="menu-slide-container flex w-full items-center justify-between  ">
                    <button className="menu-slide-text">ABOUT US</button>
                    <button className="menu-slide-text-clone ">ABOUT US</button>
                    {!isAboutUs && <MenuArrow />}
                    {isAboutUs && <CircleNav />}
                  </motion.div>
                </Link>
                <Link
                  href="/projects"
                  aria-label="projects"
                  onClick={handleClose}
                >
                  <motion.div className="menu-slide-container flex w-full items-center justify-between  ">
                    <button className="menu-slide-text">PROJECTS</button>
                    <button className="menu-slide-text-clone ">PROJECTS</button>
                    {!isProjects && <MenuArrow />}
                    {isProjects && <CircleNav />}
                  </motion.div>
                </Link>
                <Link
                  href="/contact"
                  aria-label="contact"
                  onClick={handleClose}
                >
                  <motion.div className="menu-slide-container flex w-full items-center justify-between  ">
                    <button className="menu-slide-text">CONTACT</button>
                    <button className="menu-slide-text-clone ">CONTACT</button>
                    {!isContactUs && <MenuArrow />}
                    {isContactUs && <CircleNav />}
                  </motion.div>
                </Link>
              </motion.div>
              <motion.div
                className="second-menu mt-5 flex flex-col gap-5 rounded-2xl  p-5"
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
                  <div className="menu-slide-container flex w-full items-center justify-between  ">
                    <button className="menu-slide-text">
                      <div className="relative flex">
                        <div> {`// Steven`}</div>
                        <div className="absolute -right-5 bottom-5 text-sm ">
                          00
                        </div>
                      </div>
                    </button>
                    <button className="menu-slide-text-clone ">
                      <div className="relative flex">
                        <div> {`// Steven`}</div>
                        <div className="absolute -right-5 bottom-5 text-sm ">
                          00
                        </div>
                      </div>
                    </button>

                    {!isSteven && <MenuArrow />}

                    {isSteven && <CircleNav />}
                  </div>
                </Link>
                <Link
                  href="/zaviar"
                  aria-label="Zaviar Profile"
                  onClick={handleClose}
                >
                  <div className="menu-slide-container flex w-full items-center justify-between  ">
                    <button className="menu-slide-text">
                      <div className="relative flex">
                        <div> {`// Zaviar`}</div>
                        <div className="absolute -right-5 bottom-5 text-sm ">
                          01
                        </div>
                      </div>
                    </button>
                    <button className="menu-slide-text-clone ">
                      <div className="relative flex">
                        <div> {`// Zaviar`}</div>
                        <div className="absolute -right-5 bottom-5 text-sm ">
                          01
                        </div>
                      </div>
                    </button>

                    {!isZaviar && <MenuArrow />}
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
