import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
export default function StevenAndersonProfile() {
  const outlineTextStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "4rem",
    color: "transparent",
    WebkitTextStroke: "2px #000", // Use WebkitTextStroke for the outline
    zIndex: 1,
  };

  const contentTextStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "4rem",
    zIndex: 2,
  };

  return (
    <div className="mt-10 h-3/4 w-3/4">
      <Spline scene="https://prod.spline.design/KLzdjlL6uWS9CbiJ/scene.splinecode" />
    </div>
  );
}
