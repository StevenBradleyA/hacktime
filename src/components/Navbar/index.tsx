import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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
    <div className="sticky -top-5 z-20 p-5">
      <nav
        // className={` ${
        //   isScrolled ? `bg-white` : `bg-black`
        // } rounded-2xlbg-glass mb-5 flex items-center justify-between py-2 text-green-400 shadow-sm`}
        className="bg-gray-500 rounded-2xlbg-glass mb-5 flex items-center justify-between py-2 text-green-400 shadow-sm"
        aria-label="Main Navigation -z-30"
      >
        {/* <Link href="/" aria-label="Home">
          <Image alt="home" src={homeLogo} className="mb-2 w-32" />
        </Link> */}

        <Link href="/" aria-label="Home">
          hacktime
        </Link>

        <Link href="/steven" aria-label="Pricing">
          Steven
        </Link>

        <Link href="/zaviar" aria-label="Feature">
          Zaviar
        </Link>
      </nav>
    </div>
  );
}
