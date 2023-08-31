import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import clock from "../../../public/photos/clock.png";
export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className=" mb-5 flex items-center justify-evenly gap-10 bg-gray-800 p-3"
      aria-label="Main Navigation -z-30"
    >
      <div className="flex w-1/3 justify-end">
        <Link href="/" aria-label="Home">
          <Image alt="home" src={clock} className="mb-2 w-10" />
        </Link>
      </div>
      <div className="flex w-1/3 justify-center">
        <Link href="/" aria-label="Home">
          <div className="flex flex-col items-center justify-center">
            <div className=" text-center text-5xl">HackTime</div>

            <div
              className="border-t-2  text-xs"
              style={{ borderColor: "#00FF99" }}
            >
              01101000 01100001 01100011 01101011
            </div>
            <div className="text-xs">01110100 01101001 01101101 01100101</div>
          </div>
        </Link>
      </div>
      {/* 01101000 01100001 01100011 01101011 01110100 01101001 01101101 01100101 */}

      <div className="ju flex w-1/3 gap-10">
        <Link href="/steven" aria-label="Pricing">
          <div className="flex flex-col">
            <div className=" relative top-2 flex justify-end text-xs"> 00</div>
            <div className="flex items-center gap-2 text-2xl">
              <div className=" relative bottom-1 ">{`//`}</div>
              <div className="">Steven</div>
            </div>
          </div>
        </Link>

        <Link href="/zaviar" aria-label="Feature">
          <div className="flex flex-col">
            <div className=" relative top-2 flex justify-end text-xs"> 01</div>
            <div className="flex items-center justify-center gap-2 text-2xl">
              <div className="relative bottom-1 ">{`//`}</div>
              <div>Zaviar</div>
            </div>
          </div>
        </Link>
      </div>
    </nav>
  );
}
