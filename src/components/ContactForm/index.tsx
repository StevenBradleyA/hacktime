import { motion } from "framer-motion";

interface ContactFormProps {
  closeModal: () => void;
}

export default function ContactForm({ closeModal }: ContactFormProps) {
  return (
    <div className="flex-col ">
      <div>{`Let's work Together!`}</div>
      <div>what is your budget? </div>
      <div className="flex">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-3xl bg-white px-6 py-2"
        >
          0-1k
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-3xl bg-white px-6 py-2"
        >
          1-5k
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-3xl bg-white px-6 py-2"
        >
          10k+
        </motion.button>
      </div>

      <div>What kind of site do you want us to build for you?</div>
      <textarea />

      <div>{`What's your email?`} </div>
      <input />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-3xl bg-white px-6 py-2"
      >
        Submit
      </motion.button>
    </div>
  );
}
