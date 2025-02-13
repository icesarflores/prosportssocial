import React from "react";
import { Card } from "@/components/ui/card";

const TermsPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-600">
            By accessing and using ProSportsTalk, you accept and agree to be
            bound by these Terms and Conditions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">2. User Conduct</h2>
          <p className="text-gray-600">
            Users must follow community guidelines and maintain respectful
            interactions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">3. Content Policy</h2>
          <p className="text-gray-600">
            Users are responsible for the content they post and must respect
            copyright laws.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">4. Privacy</h2>
          <p className="text-gray-600">
            We protect your privacy according to our Privacy Policy.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default TermsPage;
