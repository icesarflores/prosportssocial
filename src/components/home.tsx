import React from "react";
import LeftSidebar from "./layout/LeftSidebar";
import MainFeed from "./feed/MainFeed.tsx";
import RightSidebar from "./layout/RightSidebar";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import ScoreScroller from "./scores/ScoreScroller";

interface HomeProps {
  onNavigate?: (href: string) => void;
  activeRoute?: string;
}

const Home = ({
  onNavigate = () => {},
  activeRoute = "/",
  hideMainFeed = false,
}: HomeProps & { hideMainFeed?: boolean }) => {
  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="flex flex-col md:flex-row w-full max-w-[1400px] md:px-4 gap-6 px-0 mx-auto py-6">
        {/* Left Sidebar - Hidden on mobile, shown as drawer */}
        <div className="md:block w-full md:w-[320px] md:min-w-[320px] h-fit">
          <div className="sticky top-[120px]">
            <LeftSidebar onNavigate={onNavigate} activeRoute={activeRoute} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex justify-center">
          {!hideMainFeed && <MainFeed />}
        </div>

        {/* Right Sidebar - Hidden on mobile */}
        <div className="hidden lg:block w-full lg:w-[320px] lg:min-w-[320px] h-fit">
          <div className="sticky top-[120px]">
            <RightSidebar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
