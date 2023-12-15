import Image from "next/image";
import praiseTheSun from "@public/Graphics/under-construction.png";
import diagonal from "@public/Graphics/diagonal-1.png";
import line from "@public/Graphics/gray-line.png";

export default function ZaviarBrownProfile() {
  return (
    <div className="relative mt-44 flex w-full px-20">
      <div className="text-hackGray ml-20 mt-40 w-1/2 flex-wrap text-8xl">
        {`Zaviar's page is under construction`}
      </div>
      <Image
        src={line}
        alt="diagonal lines"
        className="absolute -bottom-44 left-20 w-96 "
      />
      <Image
        src={diagonal}
        alt="diagonal lines"
        className="absolute right-0 top-0 w-1/2"
      />
      <Image
        src={praiseTheSun}
        alt="under construction"
        className="absolute right-0 top-0 w-1/2"
      />
    </div>
  );
}
