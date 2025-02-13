import React from "react";
import { Card } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">About ProSportsTalk</h1>
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            ProSportsTalk is dedicated to bringing sports fans together in a
            vibrant community where they can discuss, share, and stay updated on
            all things sports.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Real-time sports updates and scores</li>
            <li>Community discussions and fan engagement</li>
            <li>Expert analysis and commentary</li>
            <li>Comprehensive coverage of NFL, NBA, MLB, and more</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-600">
            Email: contact@prosportstalk.com
            <br />
            Phone: (555) 123-4567
            <br />
            Address: 123 Sports Avenue, Suite 100
            <br />
            New York, NY 10001
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AboutPage;
