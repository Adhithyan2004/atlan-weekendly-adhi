import Hero from "@/components/custom/Hero";
import Navbar from "@/components/custom/Navbar";
import React from "react";

const Home = () => {
  return (
    <div className="h-screen bg-violet-200">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;
