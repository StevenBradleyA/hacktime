import Image from "next/image";
import contactVert from "@public/Graphics/contact-vert.png";
import grayLine from "@public/Graphics/gray-line.png";
import contactContact from "@public/Graphics/contact-contact.png";
import DiagonalRightArrow from "~/components/Icons/upperRightArrow";
import GitHubIcon from "~/components/Icons/github";
import LinkedInIcon from "~/components/Icons/linkedIn";

export default function Contact() {
  return (
    <div className="flex w-full">
      <div className=" bg-lightGray absolute top-0 h-screen w-1/3 "></div>
      {/* <div className=" bg-lightGray absolute top-0 right-0 h-screen w-2/3 "></div> */}

      <div className="relative z-10 flex w-1/3 flex-col pl-20 text-xl ">
        <div className="absolute -right-10 -top-2 rotate-90 text-8xl">
          HT://
        </div>
        <div className="mt-60">Ready to Build an amazing website? </div>
        <div className="mt-5">
          Then feel free to fill out this form and we will reach out to you!{" "}
        </div>
        <button className="mt-10 w-40 bg-green-500 px-6 py-2 text-black">
          {" "}
          {`Let's Chat`}
        </button>
        <div className="mt-20 flex flex-col">
          <div className="flex">
            <button className="h-16 w-16 bg-charcoal"></button>
            <button className="flex h-16 w-16 items-center justify-center bg-slateBlack">
              <GitHubIcon />
            </button>
          </div>
          <div className="flex">
            <button className="flex h-16 w-16 items-center justify-center bg-slateBlack">
              <LinkedInIcon />
            </button>
            <button className="h-16 w-16 bg-charcoal"></button>
          </div>

          <div className="mt-10 flex">
            <button className="flex h-16 w-16 items-center justify-center bg-charcoal"></button>
            <button className="flex h-16 w-16 items-center justify-center bg-slateBlack">
              <GitHubIcon />
            </button>
          </div>
          <div className="flex">
            <button className="flex h-16 w-16 items-center justify-center bg-slateBlack">
              <LinkedInIcon />
            </button>
            <button className="h-16 w-16 bg-charcoal"></button>
          </div>

          <div className=" absolute -right-7 bottom-14">
            <Image src={grayLine} alt="contact-logo" className="scale-150" />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-2/3  ">
        <div className="mt-64 flex flex-col items-center justify-center text-3xl">
          <div>Get in touch with us at</div>
          <div>
            <a href="mailto:hacktimedev@outlook.com">hacktimedev@outlook.com</a>
          </div>

          {/* <DiagonalRightArrow fill="currentColor" />
          <DiagonalRightArrow fill="none" />
          <DiagonalRightArrow fill="none" /> */}
        </div>

        <div className=" absolute -top-20">
          <Image src={contactVert} alt="contact-logo" className="w-5/6" />
        </div>
        <div className=" absolute bottom-44 right-24">
          <Image
            src={grayLine}
            alt="contact-logo"
            className="h-6 w-32 object-cover"
          />
        </div>
        <div className=" absolute bottom-0 right-0">
          <Image src={contactContact} alt="contact-logo" className="w-5/6" />
        </div>
      </div>
    </div>
  );
}
