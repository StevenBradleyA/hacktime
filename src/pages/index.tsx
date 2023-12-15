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
import temporary from "@public/Homepage/_f4b1680f-f1c9-478f-b70e-bacd25904b37.jpg";
import Image from "next/image";
import DownArrowIcon from "~/components/Icons/downArrow";

export default function Home() {
  // todo enable scroll on 3D scene
  // todo what is background had the matrix falling when clicked for the 3d scene? could be cool?

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

  const bounceVariants = {
    initial: { opacity: 1, y: 20, rotate: 0 },
    bobble: {
      opacity: 1,
      y: [0, 8, 0],
      rotate: [0, -5, 0],
      transition: { duration: 2, yoyo: "loop", repeat: 10 },
    },
    exit: { opacity: 1, y: -20, rotate: 5 },
  };

  // TODO Next.js TRPC Prisma Cloud storage talk about all these or add them to some cool graphics
  // TODO better search results optimized for web crawling
  // TODO fast websites

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

      <div className="mt-10 h-screen w-full flex-col items-center justify-center  px-20">
        <div className="flex h-7 w-full justify-between"></div>

        <div
          className="relative h-3/4 w-full rounded-3xl bg-black"
          onMouseEnter={handle3DSceneMouseEnter}
          onMouseLeave={handle3DSceneMouseLeave}
        >
          <div className="absolute -top-32 w-full cursor-pointer ">
            <Spline scene="https://prod.spline.design/vC6L8LFnvRbgMcAo/scene.splinecode" />
          </div>
        </div>
        <div className="flex h-7 w-full justify-between">
          <div>00</div>
          <div>01</div>
          <div>00</div>
          <div>01</div>
        </div>
        <motion.div
          className="flex justify-center gap-5"
          initial="initial"
          animate="bobble"
          exit="exit"
          variants={bounceVariants}
        >
          <div className="text-2xl">scroll down</div>
          <DownArrowIcon />
        </motion.div>
      </div>
      <div className="mt-0 w-full flex-col px-20">
        <div>
          {` At HackTime, we're not just web developers; we're your dedicated
          partners in turning digital dreams into reality. Our small yet dynamic
          team of freelance web developers specializes in crafting unique and
          impactful websites tailored to your needs.`}
        </div>

        <div className="flex w-full justify-between ">
          <Image src={temporary} alt="temp photo" className="w-80" />
          <div className="flex-col">
            <div className="my-10 text-3xl">
              Sites that look great on mobile and all devices
            </div>
            <div className="my-10 text-3xl">
              Our sites are search engine optimized so your business will get
              clicks
            </div>
          </div>
        </div>

        <div className="flex w-full justify-evenly bg-dark">
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
      </div>
    </>
  );
}

{
  /* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 transform full:scale-95 ">
            <Spline scene="https://draft.spline.design/j0eJgdDnboOd6Ng6/scene.splinecode" />
          </div> */
}

// What Sets Us Apart:
// 🚀 Passion for Innovation: We thrive on bringing fresh ideas to life. Whether it's a sleek portfolio, a robust e-commerce platform, or a cutting-edge blog, our passion for innovation knows no bounds.

// 💡 Versatility: Any theme, any concept – we've got it covered! From modern and minimalist designs to vibrant and interactive layouts, we adapt to your vision and deliver websites that stand out.

// 🤝 Collaborative Approach: We believe in collaboration. Your ideas combined with our expertise create a powerful synergy. We listen, strategize, and implement, ensuring your website not only meets but exceeds your expectations.

// Our Services:
// 🌐 Website Design & Development: Crafting visually stunning and user-friendly websites that leave a lasting impression.

// 🛒 E-Commerce Solutions: Building secure and scalable e-commerce platforms that drive conversions.

// 🔧 Custom Solutions: Tailoring websites to your unique requirements, ensuring a perfect fit for your business.

// Why Choose HackTime?
// 👨‍💻 Experienced Freelancers: Benefit from the expertise of a seasoned team of freelance web developers with a track record of successful projects.

// 🚀 Timely Delivery: Time is of the essence. We prioritize efficiency and ensure your project is delivered on time, every time.

// 📈 Scalable Solutions: As your business grows, so should your website. Our scalable solutions future-proof your online presence.

// Ready to embark on a digital journey with us? Let's bring your ideas to life. Connect with HackTime, and let's build something extraordinary together!
