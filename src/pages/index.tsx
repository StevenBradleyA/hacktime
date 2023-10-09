import Head from "next/head";
import Spline from "@splinetool/react-spline";
import { useEffect, useState } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import PlayArrowIcon from "~/components/Icons/PlayArrow";

export default function Home() {
  const [is3DHover, setIs3DHover] = useState<boolean>(false);

  const handle3DSceneMouseEnter = () => {
    setIs3DHover(true);
  };

  const handle3DSceneMouseLeave = () => {
    setIs3DHover(false);
  };

  // TODO test resposive sizing with autozoom test moving it to different monitors as well
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  // todo implement acceleration on count and instersect observer
  useEffect(() => {
    const animateCount = () => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setCount(i);
        if (i === 100) clearInterval(interval);
      }, 100); // Adjust the interval as needed (milliseconds)
    };

    animateCount();
  }, []);

  return (
    <>
      <Head>
        <title>hacktime</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute left-1/4 top-10 z-30 flex-col text-5xl">
        <div>We build bespoke web</div>
        <div> experiences, turning your </div>
        <div>visions into online reality</div>
      </div>

      <div className="mt-10 h-screen w-full flex-col items-center justify-center   px-20">
        <div className="flex h-7 w-full justify-between"></div>

        <div
          className="relative h-3/4 w-full rounded-3xl bg-black"
          onMouseEnter={handle3DSceneMouseEnter}
          onMouseLeave={handle3DSceneMouseLeave}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 transform full:scale-95 ">
            <Spline
              scene="https://draft.spline.design/j0eJgdDnboOd6Ng6/scene.splinecode"
              // className=" outline-dashed"
            />
          </div>
        </div>
        <div className="flex h-7 w-full justify-between">
          <div>00</div>
          <div>01</div>
          <div>00</div>
          <div>01</div>
        </div>
      </div>
      <div className="flex w-full justify-evenly bg-dark px-20">
        <div className="mt-30 w-1/3 text-8xl ">
          Your Business is unique so your site should be too
        </div>
        <div className="flex h-[600px] w-1/4 items-center justify-center rounded-2xl bg-black px-10 shadow-2xl">
          <Spline scene="https://prod.spline.design/KLzdjlL6uWS9CbiJ/scene.splinecode" />
        </div>
      </div>
      <div className="mb-40 mt-40 flex justify-between">
        <motion.div className="w-1/3 text-5xl">{count} </motion.div>
        <div className="text-6xl">Reasons to work with us</div>
      </div>
      <div className="my-10 text-3xl">
        Sites that look great on mobile and all devices
      </div>
      <div className="my-10 text-3xl">
        Our sites are search engine optimized so your business will get clicks
      </div>
      <div className="my-10 text-3xl">Your success is our success</div>
      <div>
        Payment integration, email, text confirmations, cloud storage whatever
        your business needs we can do it.
      </div>
      <div>Featured Work</div>
      <div>cards here</div>
    </>
  );
}
