import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-center  px-4 py-2">
      <div className="flex flex-col items-center  xl:w-1/5 sm:w-1/2 shadow-[4px_3px_0px_rgba(0,0,0,1)] rounded-md p-2 bg-white">
        <h1 className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold  text-violet-700">
          WEEKENDLY
        </h1>
        <p className=" font-semibold lg:text-lg text-violet-700">
          Your weekend, your vibe.
        </p>
      </div>
    </div>
  );
};

export default Navbar;
