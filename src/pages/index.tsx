import React from "react";
import ThreeColumnLayout from "@/components/layout/ThreeColumnLayout";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import SocialFeed from "@/components/feed/SocialFeed";

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <ThreeColumnLayout
        leftSidebar={<LeftSidebar />}
        mainContent={<SocialFeed />}
        rightSidebar={<RightSidebar />}
      />
    </div>
  );
};

export default IndexPage;
