import { motion } from "framer-motion";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";

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
        icon: "👏",
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
      errorsObj.text = "Please provide the body";
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
    <form className="flex flex-col items-center justify-center p-10 text-2xl">
      <div className=" mb-10 text-center text-6xl">{`Let's work together!`}</div>
      <div className="mb-5">What are your budget expectations? </div>
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
        <div className="text-failure text-lg ">{errors.budget}</div>
      )}

      <div className="my-5">
        What kind of site do you want us to build for you?
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className=" h-48 w-full rounded-md bg-black p-5 text-lg text-white focus:border-transparent focus:outline-none focus:ring-1 focus:ring-green-500"
        placeholder="Explain a bit about your site"
      />
      {showErrors && errors.text && (
        <div className="text-failure text-lg ">{errors.text}</div>
      )}
      <div className=" mt-5 flex items-center gap-5 ">
        <div>{`What's your email?`} </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" rounded-md bg-black px-8 py-3 text-lg text-white focus:border-transparent focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder="example@gmail.com"
        />
      </div>
      {showErrors && errors.email && (
        <div className="text-failure text-lg ">{errors.email}</div>
      )}
      {showErrors && errors.emailFormat && (
        <div className="text-failure text-lg">{errors.emailFormat}</div>
      )}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 rounded-3xl bg-white px-6 py-2"
        onClick={(e) => {
          e.preventDefault();
          void submit(e);
        }}
      >
        Submit
      </motion.button>
    </form>
  );
}
