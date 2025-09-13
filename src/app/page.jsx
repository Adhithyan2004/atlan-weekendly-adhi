"use client";

import Footer from "@/components/custom/Footer";
import Hero from "@/components/custom/Hero";
import Navbar from "@/components/custom/Navbar";
import SplashScreen from "@/components/custom/SplashScreen";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { saveActivities, loadActivities } from "@/utils/storage.utils";

// Passing activites as props to handle render issue
const Home = () => {
  const [activities, setActivities] = useState([]);
  const [splashDone, setSplashDone] = useState(
    typeof window !== "undefined" && window.innerWidth < 640 ? true : false
  );

  // getting activites from localstorage after splash animation
  useEffect(() => {
    setActivities(loadActivities());
  }, []);

  useEffect(() => {
    saveActivities(activities);
  }, [activities]);

  return (
    <div className="2xl:h-full h-full flex flex-col justify-between 2xl:gap-11 bg-violet-300 ">
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
