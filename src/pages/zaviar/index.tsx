import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

export default function ZaviarBrownProfile() {
  return (
    <div className="h-3/4 w-3/4 ">
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
          damping: 4,
        }}
      >
        <Spline scene="https://draft.spline.design/UNte7wVDLbwLYlon/scene.splinecode" />
      </motion.div>
    </div>
  );
}
