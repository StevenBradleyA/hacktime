import Image from "next/image";
import aboutTitle from "@public/About/about-us-title.png";

export default function AboutUs() {
  return (
    <div className="relative h-[80vh] w-full px-24 ">
      <div className="absolute -left-72 top-48 w-[40%] origin-bottom  rotate-90 object-cover">
        <Image src={aboutTitle} alt="title" className="png-green" />
      </div>
      <div className="flex h-full w-full items-center justify-end ">
        <p className="bg-keebyGray w-1/2 flex-wrap rounded-3xl p-20 text-3xl">
          {`HackTime is a small dynamic team of freelance developers who are all
          about building cool, practical websites to help businesses level up.
          Whether it's revamping your existing systems or starting from scratch,
          we handle it all and keep it affordable. With HackTime, you get
          solutions that are not only tailor-made for your needs but also easy
          to integrate and use. We take pride in offering end-to-end services
          that cover everything from initial design to final deployment, all at
          reasonable prices. So, if you're ready to boost your business, we're
          here to make it happen without the hassle. Let's build something
          awesome together!`}
        </p>
      </div>
    </div>
  );
}
