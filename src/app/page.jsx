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
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    setActivities(loadActivities());
  }, []);

  useEffect(() => {
    saveActivities(activities);
  }, [activities]);

  return (
    <div className="h-screen flex flex-col justify-between bg-violet-300 relative">
      <AnimatePresence mode="wait">
        {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
      </AnimatePresence>

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
