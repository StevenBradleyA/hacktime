import Image from "next/image";

import aboutTitle from "@public/About/about-us-title.png";
import grid from "@public/About/grid-tunnel.png";

export default function AboutUs() {
  return (
    <div className="w-full px-72">
      <div className="flex justify-center">
        <Image src={aboutTitle} alt="title" className="png-green" />
      </div>
      <div className="png-light-gray my-5 h-60 w-full border-4 border-black text-3xl">
        <p>
          hi we are hacktime. I love coding and decided I wanted to build
          beautiful sites for people.
        </p>
      </div>
      <Image src={grid} alt="title" className="png-light-gray" />
      <div className="png-light-gray my-5 h-60 w-full border-4 border-black text-3xl">
        <p>
          hi we are hacktime. I love coding and decided I wanted to build
          beautiful sites for people.
        </p>
      </div>
      <div className="flex gap-10">
        <div className="png-light-gray h-96  border-4 border-black text-3xl">
          hi we are hacktime. I love coding and decided I wanted to build
          beautiful sites for people.
        </div>

        <div className="png-light-gray h-96  border-4 border-black text-3xl">
          hi we are hacktime. I love coding and decided I wanted to build
          beautiful sites for people.
        </div>
      </div>
    </div>
  );
}
