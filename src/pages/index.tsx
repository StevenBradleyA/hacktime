import Head from "next/head";
import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import DownArrowIcon from "~/components/Icons/downArrow";
import hacktimeStacked from "@public/Homepage/hacktime-stacked-offset.png";
import stripedRectLong from "@public/Graphics/diagonal-rect-long.png";
import hacktime from "@public/Graphics/hacktime-logo.png";
import backLayout from "@public/Homepage/back-layout.png";
import hackBarCode from "@public/Homepage/its-hacking-time-code.png";
import bigPogTimeCode from "@public/Homepage/big-pogtime-now-code.png";
import diagonal from "@public/Graphics/diagonal-1.png";

export default function Home() {
  // todo enable scroll on 3D scene
  // todo what is background had the matrix falling when clicked for the 3d scene? could be cool?

  const [is3DHover, setIs3DHover] = useState<boolean>(false);
  const descriptionRef = useRef<HTMLImageElement | null>(null);

  const handle3DSceneMouseEnter = () => {
    setIs3DHover(true);
  };

  const handle3DSceneMouseLeave = () => {
    setIs3DHover(false);
  };

  // const [count, setCount] = useState(0);
  // const controls = useAnimation();

  // useEffect(() => {
  //   const animateCount = () => {
  //     let i = 0;
  //     const interval = setInterval(() => {
  //       i++;
  //       setCount(i);
  //       if (i === 100) clearInterval(interval);
  //     }, 100); // Adjust the interval as needed (milliseconds)
  //   };

  //   animateCount();
  // }, []);

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

  // SEO PROs
  // talk about next.js

  return (
    <>
      <Head>
        <title>HackTime</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="desktop:top-8 desktop:text-5xl absolute left-1/4 top-16 z-30 flex-col text-4xl">
        <div>We build bespoke web</div>
        <div> experiences, turning your </div>
        <div>visions into online reality</div>
      </h1>

      <div className="desktop:h-[85vh] laptop:h-[78vh] relative mt-12 h-[70vh] w-full flex-col items-center justify-center px-24 ">
        <div className="absolute -top-3 right-24 flex gap-2">
          <Image
            src={hacktime}
            alt="hacktime logo "
            className=" png-green w-6"
          />
          <Image
            src={hacktime}
            alt="hacktime logo "
            className=" png-green w-6"
          />
          <Image
            src={hacktime}
            alt="hacktime logo "
            className=" png-green w-6"
          />
        </div>
        <div
          className="relative mt-5 h-[86%] w-full rounded-3xl bg-black"
          onMouseEnter={handle3DSceneMouseEnter}
          onMouseLeave={handle3DSceneMouseLeave}
        >
          <div className="absolute bottom-0 w-[95%] cursor-pointer ">
            {/* <Spline scene="https://prod.spline.design/vC6L8LFnvRbgMcAo/scene.splinecode" /> */}
          </div>
        </div>
        <div className="relative flex w-full justify-between ">
          <div>00</div>
          <div>01</div>
          <div>00</div>
          <div>01</div>
          <div className="absolute left-1/2 top-3 -translate-x-1/2">
            <motion.button
              className="flex cursor-pointer items-center justify-center gap-5 "
              initial="initial"
              animate="bobble"
              exit="exit"
              variants={bounceVariants}
              // onClick={scrollToHeight}
              onClick={() => {
                descriptionRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <div className="text-2xl">scroll down</div>
              <DownArrowIcon />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="relative mt-16 flex w-full flex-col overflow-hidden px-24">
        <Image
          src={backLayout}
          alt="hacktime logo "
          className=" back-layout-container absolute bottom-0 left-0 right-0 top-0 object-cover  "
          ref={descriptionRef}
        />

        <div className="back-layout desktop:w-5/6 relative left-1/2 top-10 z-10 w-full -translate-x-1/2 text-sm">
          <Image
            src={hacktime}
            alt="hacktime logo "
            className=" png-light-gray absolute left-0 w-12"
          />
          <div className="absolute left-[10%] top-1 text-4xl text-neonTeal">{`HT://`}</div>
          <div className="absolute left-5 top-40 origin-left -rotate-90 text-hackGray">
            FAST
          </div>
          <div className="absolute left-5 top-96 origin-left -rotate-90 text-hackGray">
            SEO OPTIMIZED
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 64 64"
            className="absolute left-3 top-[35rem] w-4 text-neonTeal"
          >
            <path
              d="M62 10.571L53.429 2L32 23.429L10.571 2L2 10.571L23.429 32L2 53.429L10.571 62L32 40.571L53.429 62L62 53.429L40.571 32z"
              fill="currentColor"
            />
          </svg>

          <Image
            src={hackBarCode}
            alt="hacktime logo "
            className=" png-light-gray desktop:-right-32 absolute -right-10 top-4 h-7 w-64 object-cover"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 64 64"
            className="absolute right-0 top-40 w-4 text-neonTeal"
          >
            <path
              d="M62 10.571L53.429 2L32 23.429L10.571 2L2 10.571L23.429 32L2 53.429L10.571 62L32 40.571L53.429 62L62 53.429L40.571 32z"
              fill="currentColor"
            />
          </svg>
          <div className="absolute right-2 top-80 origin-right -rotate-90 text-hackGray">
            NEXT JS
          </div>
          <div className="absolute right-2 top-[40rem] origin-right -rotate-90 text-white">
            POGGERS
          </div>
          <div className="desktop:top-10 desktop:w-full absolute left-1/2  top-0 z-10 w-5/6 -translate-x-1/2">
            <Spline scene="https://prod.spline.design/KLzdjlL6uWS9CbiJ/scene.splinecode" />
          </div>
        </div>

        <div className=" relative left-[55%] top-24   z-30 flex w-full flex-col">
          <h2 className="desktop:text-8xl text-5xl text-neonTeal ">
            FREELANCE-
          </h2>
          <h2 className="desktop:text-8xl text-5xl text-neonTeal ">
            DEVELOPERS
          </h2>

          <p className="-mb-2 text-white">
            Need a website? We do everything from domain acquistion to
          </p>
          <p className="-mb-2 text-white">
            design, hosting, and building a fast beautiful site that makes your
            business
          </p>
          <p className="text-white">
            stand out. Your Business is unique so your site should be too
          </p>
        </div>

        <div className="z-30 ml-[15%] mt-24 flex w-full flex-col text-neonTeal ">
          <p className="-mb-2 text-white">
            Small Business? Corporate Business? We work with them all.
          </p>
          <p className="-mb-2 text-white">
            Want a unique feature or something custom, we can build it.
          </p>
          <p className="desktop:-mb-16 -mb-8 text-white">
            Your success is our success.
          </p>
          <h2 className="desktop:-mb-32 desktop:text-[12rem] -mb-20 text-[8rem] ">
            UNIQUE-
          </h2>
          <h2 className="desktop:text-[12rem] text-[8rem] ">DESIGNS</h2>
        </div>
      </div>

      <div className=" bg-darkGray desktop:h-[65vh] z-20 flex h-[80vh] w-full justify-between px-24 text-3xl text-purple-500">
        <div className="h-2/3 w-96 rounded-lg bg-black p-10"></div>

        <div className="mt-20 h-2/3 w-96 rounded-lg bg-black p-10"></div>

        <div className="mt-40 h-2/3 w-96 rounded-lg bg-black p-10"></div>
      </div>

      <div className=" relative  w-full px-24">
        <h2 className=" relative z-20 text-9xl">OUR WORK</h2>
        <Image
          src={diagonal}
          alt="diagonal art"
          className="absolute left-[20%] top-0 z-10 opacity-50 "
        />
      </div>

      {/* <div className="relative h-10  w-full">
          <Image
            src={hacktimeStacked}
            alt="hacktime logo "
            className=" absolute -bottom-24 right-0 w-1/3 png-light-gray"
          />
        </div> */}
      <div className="mt-96 h-10"></div>
      <div className="mt-96 h-10"></div>

      <Image
        src={stripedRectLong}
        alt="hacktime logo "
        className="png-light-gray mt-96"
      />

      <div className="flex w-full ">
        <div className="png-light-gray flex w-1/3 flex-col justify-evenly">
          <Image
            src={hacktime}
            alt="smile logo "
            className=" w-32  opacity-10"
          />
          <Image
            src={hacktime}
            alt="smile logo "
            className=" w-32  opacity-50"
          />
          <Image
            src={hacktime}
            alt="smile logo "
            className="w-32  opacity-75"
          />
          <Image src={hacktime} alt="smile logo " className="  w-32" />
        </div>
      </div>

      <div className="flex w-full justify-between ">
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

      <div className="mt-30 w-1/3 text-8xl ">
        Your Business is unique so your site should be too
      </div>

      <div className="my-10 text-3xl">
        Sites that look great on mobile and all devices
      </div>
      <div className="my-10 text-3xl">
        {`   Our sites are search engine optimized so your business will get
          clicks. We have a ton of experience in understanding web crawlers. we
          use the correct semantics to help your site be accessible. Next.js has
          the speed of React so pages don't refresh. but the power to preload
          and make your sites easier to find by consumers.`}
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
