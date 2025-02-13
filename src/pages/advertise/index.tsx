import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AdvertisePage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Advertise with Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Why Advertise with Us?
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Reach millions of engaged sports fans</li>
              <li>Targeted advertising opportunities</li>
              <li>Flexible advertising packages</li>
              <li>Premium placement options</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-600">
              Email: advertising@prosportstalk.com
              <br />
              Phone: (555) 123-4567
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input type="text" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <Input type="text" placeholder="Your company" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                placeholder="Tell us about your advertising needs"
                className="min-h-[150px]"
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdvertisePage;
