import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

export default function ZaviarBrownProfile() {
  return (
    <div className="mt-20 flex w-screen items-center justify-center ">
      <motion.div
        initial={{ opacity: 1, x: -200 }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 3,
          type: "spring",
          stiffness: 75,
          damping: 4
        }}
      >
        <Spline scene="https://prod.spline.design/rlJs00XkpmgtyfSU/scene.splinecode" />
      </motion.div>
    </div>
  );
}
