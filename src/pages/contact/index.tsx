import Image from "next/image";
import contactVert from "@public/Graphics/contact-vert.png";
import grayLine from "@public/Graphics/gray-line.png";
import contactContact from "@public/Graphics/contact-contact.png";
import DiagonalRightArrow from "~/components/Icons/upperRightArrow";
import GitHubIcon from "~/components/Icons/github";
import LinkedInIcon from "~/components/Icons/linkedIn";
import ModalDialog from "~/components/Modal";
import ContactForm from "~/components/ContactForm";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RightArrow from "~/components/Icons/rightArrow";
import stripedButtonBlack from "@public/Graphics/striped-label-black.png";
import stripedButtonGreen from "@public/Graphics/striped-label-green.png";
import stripedButtonGray from "@public/Graphics/striped-label.png";

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const buttonVariants = {
    initial: { opacity: 0, x: -20 },
    hover: { opacity: 1, x: 0 },
  };

  const textVariants = {
    initial: { opacity: 0, x: 20 },
    hover: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex w-full">
      <div className=" bg-lightGray absolute top-0 h-screen w-1/3 "></div>
      {/* <div className=" bg-lightGray absolute top-0 right-0 h-screen w-2/3 "></div> */}

      <div className="relative z-10 w-1/3 px-20 text-xl ">
        <div className="absolute -right-10 -top-2 rotate-90 text-8xl">
          HT://
        </div>
        <div className="mt-60">Ready to build an amazing website? </div>
        <div className="mt-5">
          {` Share your details in this form, and we'll get back to you!`}
        </div>

        <button
          className={`relative mt-10 ${
            isHovered ? "text-green-500" : "text-black"
          } `}
          onClick={openModal}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            transition={{ duration: 0.3 }}
          >
            {isHovered ? (
              <Image
                src={stripedButtonBlack}
                alt="form button"
                className=" w-56"
              />
            ) : (
              <Image
                src={stripedButtonGray}
                alt="form button"
                className=" w-56"
              />
            )}
          </motion.div>

          <motion.div
            className="absolute left-16 top-2"
            variants={textVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            transition={{ duration: 0.3 }}
          >
            {`Let's Chat`}
          </motion.div>
        </button>

        <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
          <ContactForm closeModal={closeModal} />
        </ModalDialog>
        <div className="mt-28 flex flex-col">
          <div className="flex">
            <button className="h-16 w-16 bg-charcoal"></button>
            <button
              className="flex h-16 w-16 items-center justify-center bg-slateBlack"
              onClick={() =>
                window.open("https://github.com/StevenBradleyA", "_blank")
              }
            >
              <GitHubIcon />
            </button>
          </div>
          <div className="flex">
            <button
              className="flex h-16 w-16 items-center justify-center bg-slateBlack"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/stevenanderson-dev/",
                  "_blank",
                )
              }
            >
              <LinkedInIcon />
            </button>
            <button className="h-16 w-16 bg-charcoal"></button>
          </div>

          <div className="mt-10 flex">
            <button className="flex h-16 w-16 items-center justify-center bg-charcoal"></button>
            <button
              className="flex h-16 w-16 items-center justify-center bg-slateBlack"
              onClick={() =>
                window.open("https://github.com/ZaviarBrown", "_blank")
              }
            >
              <GitHubIcon />
            </button>
          </div>
          <div className="flex">
            <button
              className="flex h-16 w-16 items-center justify-center bg-slateBlack"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/zaviar-brown-9a1b581b9/",
                  "_blank",
                )
              }
            >
              <LinkedInIcon />
            </button>
            <button className="h-16 w-16 bg-charcoal"></button>
          </div>

          <div className=" absolute -right-7 bottom-14">
            <Image src={grayLine} alt="contact-logo" className="scale-150" />
          </div>
        </div>
      </div>

      <div className="relative w-2/3  ">
        <div className="mt-64 flex flex-col items-center justify-center text-3xl">
          <div className="text-white">Get in touch with us at</div>
          <div className="relative">
            <a href="mailto:hacktimedev@outlook.com">hacktimedev@outlook.com</a>

            {/* <div className="absolute -left-10 top-10 ">
              <DiagonalRightArrow fill="currentColor" />
            </div>
            <div className="absolute -left-16 top-16 ">
              <DiagonalRightArrow fill="none" />
            </div>
            <div className="absolute -left-24 top-24 ">
              <DiagonalRightArrow fill="none" />
            </div> */}
          </div>
        </div>

        <div className=" contact-page-title absolute -top-20">
          <Image src={contactVert} alt="contact-logo" className="w-5/6" />
        </div>
        <div className=" absolute bottom-44 right-24">
          <Image
            src={grayLine}
            alt="contact-logo"
            className="h-6 w-32 object-cover"
          />
        </div>
        <div className=" absolute bottom-0 right-0">
          <Image src={contactContact} alt="contact-logo" className="w-5/6" />
        </div>
      </div>
    </div>
  );
}
