import Image from "next/image";
import diagonal from "@public/Graphics/diagonal-1.png";

export default function AdminCustomers() {
  return (
    <>
      <div className="relative mt-10 flex w-full items-center justify-center text-8xl ">
        <div style={{ zIndex: 2 }}>CUSTOMERS</div>
        <Image
          src={diagonal}
          alt="diagonal art"
          className="absolute right-1/4 opacity-50 "
        />
      </div>
      <h1 className="mt-20">
        the goal of this page is to view total customer transactions for taxes{" "}
      </h1>
      <div>
        also we want the ability to send payments to specific users for a total
        web build that shows up on thier dash borderRadius{" "}
      </div>
      <div>as well as manage subscription prices </div>
    </>
  );
}
