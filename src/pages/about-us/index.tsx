import Image from "next/image";

import aboutTitle from "@public/About/about-us-title.png";
import grid from "@public/About/grid-tunnel.png";

export default function AboutUs() {
  return (
    <div className="relative h-[80vh] w-full px-24 ">
      <div className="absolute -left-72 top-60 w-[40%] origin-bottom  rotate-90 object-cover">
        <Image src={aboutTitle} alt="title" className="png-green" />
      </div>
      <div className="flex w-full justify-end items-center h-3/4 ">
        <p className="bg-keebyGray w-1/2 flex-wrap rounded-md p-10">
          Hello, we are HackTime. We love coding and decided to build. Poggers
          pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog
          pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog
          pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog
          pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog
          pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog
          pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog
          pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog pog
          pog pog pog pog pog pog pog pog pog pog pog
        </p>
      </div>
    </div>
  );
}
