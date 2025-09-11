"use client";

import Footer from "@/components/custom/Footer";
import Hero from "@/components/custom/Hero";
import Navbar from "@/components/custom/Navbar";
import SplashScreen from "@/components/custom/SplashScreen";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { saveActivities, loadActivities } from "@/utils/storage.utils";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [splashDone, setSplashDone] = useState(
    typeof window !== "undefined" && window.innerWidth < 640 ? true : false
  );

  useEffect(() => {
    setActivities(loadActivities());
  }, []);

  useEffect(() => {
    saveActivities(activities);
  }, [activities]);

  return (
    <div className="2xl:h-screen h-full flex flex-col justify-between bg-violet-300 ">
      {/* Splash screen only visible on sm+ screens */}
      <AnimatePresence mode="wait">
        {!splashDone && (
          <div className="hidden sm:flex absolute inset-0">
            <SplashScreen onFinish={() => setSplashDone(true)} />
          </div>
        )}
      </AnimatePresence>

      {/* Main app content */}
      {splashDone && (
        <>
          <Navbar />
          <Hero activities={activities} setActivities={setActivities} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
