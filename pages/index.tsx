import React from "react";

import type { NextPage } from "next";
// components
import CenterContent from "../components/CenterContent";
// styles
import classes from "../styles/index.module.css";
import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Analytical from "@/components/Home/Analytics";
import Feature from "@/components/Home/Feature";
import Join from "@/components/Home/Join";
const Home: NextPage = () => {
  return (
    <div>
      <div className="main">
        <Hero />
        <About />
        {/* <Analytical /> */}
        <Feature />
        <Join />
      </div>
    </div>
  );
};

export default Home;
