import Image from "next/image";
import contactVert from "@public/Graphics/contact-vert.png";

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
        <div className="flex flex-col mt-20" >

          <div className="flex">
            <button className="bg-charcoal w-16 h-16"></button>
            <button className="bg-slateBlack w-16 h-16"></button>
          </div>
          <div className="flex">
            <button className="bg-slateBlack w-16 h-16"></button>
            <button className="bg-charcoal w-16 h-16"></button>
          </div>

          <div className="flex mt-10">
            <button className="bg-charcoal w-16 h-16"></button>
            <button className="bg-slateBlack w-16 h-16"></button>
          </div>
          <div className="flex">
            <button className="bg-slateBlack w-16 h-16"></button>
            <button className="bg-charcoal w-16 h-16"></button>
          </div>



        </div>
      </div>

      <div className="relative z-10 w-2/3  ">
        <div className=" absolute -top-20">
          <Image src={contactVert} alt="contact-logo" className="w-5/6" />
        </div>
      </div>

      {/* 
      <div className="mt-96"> Reach us at </div>
      <div> hacktimedev@outlook.com</div>

      <div> contact form</div>

      <div> links to our linkedIn as well</div> */}
    </div>
  );
}
