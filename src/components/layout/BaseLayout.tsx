import React from "react";
import Navbar from "./Navbar";
import ScoreScroller from "../scores/ScoreScroller";
import Footer from "./Footer";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <ScoreScroller />
        <Navbar />
      </header>
      <main className="pt-[153.25px] pb-[100px]">{children}</main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
