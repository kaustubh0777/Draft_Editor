import React from "react";
import Image from "next/image";

const Credit = () => {
  return (
    <div className="credit text-white  text-xl flex items-center justify-center  py-5  w-full h-full">
      <a href="https://github.com/kaustubh0777/Draft_Editor">
        <Image
          src="/github-mark.svg"
          alt="My Image Description"
          width={100}
          height={100}
          
        />
      </a>
      <p className=" ml-5">Click the icon to view Code</p>
    </div>
  );
};

export default Credit;
