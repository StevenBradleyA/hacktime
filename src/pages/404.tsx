import Link from "next/link";
import Spline from "@splinetool/react-spline";

export default function Custom404() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0">
      <Link
        href="/"
        aria-label="home"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden  "
      >
        <h1 className="text-2xl text-green-600">404</h1>
      </Link>
      <Spline scene="https://prod.spline.design/ZYXvHyBL3BNSxwQt/scene.splinecode" />
    </div>
  );
}
