import Image from "next/image";
import GitHubIcon from "~/components/Icons/github";
import LinkedInIcon from "~/components/Icons/linkedIn";
import ModalDialog from "~/components/Modal";
import ContactForm from "~/components/ContactForm";
import { useState } from "react";
import { motion } from "framer-motion";
import contactVert from "@public/Contact/contact-vert.png";
import contactContact from "@public/Contact/contact-contact.png";
import grayLine from "@public/Graphics/gray-line.png";
import stripedButtonBlack from "@public/Graphics/striped-label-black.png";
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

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex w-full">
      <div className=" absolute top-0 h-screen w-1/3 bg-lightGray "></div>
      <div className="relative z-10 w-1/3 px-20 text-xl ">
        <div className="absolute -right-10 -top-2 rotate-90 text-8xl">
          HT://
        </div>
        <h2 className="mt-60 text-3xl text-hackGray">
          Ready for your amazing website?
        </h2>
        <h3 className="mt-2">
          {` All you have to do is share your details in this form, and we'll get back to you!`}
        </h3>
        <motion.button
          className={`relative mt-10 ${
            isHovered ? "text-green-500" : "text-hackGray"
          } `}
          onClick={openModal}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="relative"
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <Image
              src={isHovered ? stripedButtonBlack : stripedButtonGray}
              alt="form button"
              className="w-56"
            />
            <Image
              src={isHovered ? stripedButtonGray : stripedButtonBlack}
              alt="form button"
              className="striped-button-hidden absolute top-0 w-56"
            />
          </motion.div>
          <div className="absolute left-16 top-2">{`Let's Chat`}</div>
          {!isHovered && (
            <motion.div
              className=" absolute bottom-5 left-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
            >
              <Image src={grayLine} alt="contact-logo" className="w-44" />
            </motion.div>
          )}
        </motion.button>
        <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
          <ContactForm closeModal={closeModal} />
        </ModalDialog>
        <div className="mt-16 flex flex-col">
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
        <h1 className="mt-64 flex flex-col items-center justify-center text-3xl">
          <div className="text-white">Get in touch with us at</div>
          <a href="mailto:hacktimedev@outlook.com">hacktimedev@outlook.com</a>
        </h1>
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
