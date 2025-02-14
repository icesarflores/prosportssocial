import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import SocialFeed from "../feed/SocialFeed";

interface ThreeColumnLayoutProps {
  leftSidebar?: React.ReactNode;
  mainContent?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  className?: string;
}

const ThreeColumnLayout = ({
  leftSidebar = <LeftSidebar />,
  mainContent = <SocialFeed />,
  rightSidebar = <RightSidebar />,
  className = "",
}: ThreeColumnLayoutProps) => {
  return (
    <div
      className={`w-full min-h-screen bg-gray-100 dark:bg-gray-900 ${className}`}
    >
      <div className="flex flex-col lg:flex-row h-full max-w-[1512px] mx-auto px-4 py-6 gap-6">
        {/* Left Sidebar - Fixed width 280px */}
        <div className="hidden lg:block w-full lg:w-[280px] h-full flex-shrink-0">
          {leftSidebar}
        </div>

        {/* Main Content - Flexible width 752px */}
        <div className="w-[752px] h-full flex-shrink-0 border-x border-gray-200 dark:border-gray-700">
          {mainContent}
        </div>

        {/* Right Sidebar - Fixed width 280px */}
        <div className="hidden xl:block w-full xl:w-[280px] h-full flex-shrink-0">
          {rightSidebar}
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnLayout;
