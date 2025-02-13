import React from "react";
import { Card } from "@/components/ui/card";

const PrivacyPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
          <p className="text-gray-600">
            We collect information that you provide directly to us when using
            our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Data Usage</h2>
          <p className="text-gray-600">
            Your data is used to provide and improve our services, and
            personalize your experience.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
          <p className="text-gray-600">
            We implement security measures to protect your personal information.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-gray-600">
            You have the right to access, correct, or delete your personal
            information.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PrivacyPage;
