import { motion } from "framer-motion";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import hacktime from "@public/Graphics/hacktime-logo.png";

interface ContactFormProps {
  closeModal: () => void;
}

interface ErrorsObj {
  email?: string;
  emailFormat?: string;
  budget?: string;
  text?: string;
}

export default function ContactForm({ closeModal }: ContactFormProps) {
  const ctx = api.useContext();
  const [errors, setErrors] = useState<ErrorsObj>({});
  const [budget, setBudget] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const { mutate } = api.request.create.useMutation({
    onSuccess: () => {
      void ctx.request.getAll.invalidate();
      toast.success("Form Submitted!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      closeModal();
    },
  });

  useEffect(() => {
    const maxFileSize = 6 * 1024 * 1024;
    const errorsObj: ErrorsObj = {};

    if (!budget.length) {
      errorsObj.budget = "Please select a budget";
    }
    if (!email.length) {
      errorsObj.email = "Please provide your email";
    }
    const emailParts = email.split("@");

    if (
      emailParts.length !== 2 ||
      !emailParts[0]?.trim() ||
      !emailParts[1]?.trim() ||
      emailParts[1]?.indexOf(".") === -1
    ) {
      errorsObj.emailFormat = "Please provide a valid email address";
    }

    if (!text.length) {
      errorsObj.text = "Please provide a description";
    }

    setErrors(errorsObj);
  }, [budget, email, text]);

  const handleBudgetClick = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    if (type === "low") setBudget("0-1k");
    if (type === "mid") setBudget("1-5k");
    if (type === "high") setBudget("10k+");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    if (!Object.values(errors).length) {
      const data = {
        email,
        text,
        budget,
      };
      mutate(data);
    }
  };

  return (
    <div className="relative flex h-[500px] w-[650px] overflow-auto laptop:h-[660px] desktop:h-[700px]">
      <Image
        alt="hacktime-logo"
        src={hacktime}
        className="png-green absolute bottom-0 left-0 w-8"
      />

      <form
        className={`flex flex-col items-center justify-center  overflow-auto p-10 text-2xl  `}
      >
        <h1 className=" mb-5 text-center text-6xl">{`Let's work together!`}</h1>
        <h2 className="mb-2">What are your budget expectations? </h2>
        <div className="flex gap-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-3xl  px-6 py-2 ${
              budget === "0-1k" ? "bg-green-500 text-black" : "bg-black"
            }`}
            onClick={(e) => handleBudgetClick(e, "low")}
          >
            0-1k
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-3xl  px-6 py-2 ${
              budget === "1-5k" ? "bg-green-500 text-black" : "bg-black"
            }`}
            onClick={(e) => handleBudgetClick(e, "mid")}
          >
            1-5k
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-3xl  px-6 py-2 ${
              budget === "10k+" ? "bg-green-500 text-black" : "bg-black"
            }`}
            onClick={(e) => handleBudgetClick(e, "high")}
          >
            10k+
          </motion.button>
        </div>
        {showErrors && errors.budget && (
          <div className="text-base text-red-500 ">{errors.budget}</div>
        )}

        <label className="mt-5">
          What kind of site do you want us to build for you?
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-2 h-48 w-full rounded-md bg-black p-5 text-lg text-white focus:border-transparent focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="Explain a bit about your site"
          />
        </label>
        {showErrors && errors.text && (
          <div className="text-base text-red-500 ">{errors.text}</div>
        )}
        <div className=" mt-5 flex items-center gap-5 ">
          <h2>{`What's your email?`} </h2>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" rounded-md bg-black px-8 py-3 text-lg text-white focus:border-transparent focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="example@gmail.com"
          />
        </div>
        {showErrors && errors.email && (
          <div className="text-base text-red-500 ">{errors.email}</div>
        )}
        {showErrors && errors.emailFormat && (
          <div className="text-base text-red-500">{errors.emailFormat}</div>
        )}
        <button
          className="live-site-button mt-5 flex flex-shrink-0 items-center gap-2 rounded-3xl bg-darkGray py-3 pl-6 text-xl"
          onClick={(e) => {
            e.preventDefault();
            void submit(e);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="live-site-button-circle w-2"
            viewBox="0 0 32 32"
          >
            <circle cx="16" cy="16" r="16" />
          </svg>

          <span className="live-site-button-text">Send It</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="live-site-button-arrow w-6 rounded-full bg-green-500 p-1 text-black"
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
      </form>
    </div>
  );
}
