import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowUpRight, Search } from "lucide-react";

const TrendingPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <TrendingUp className="h-8 w-8 text-blue-600" />
        <h1 className="text-4xl font-bold">Trending in Sports</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Daily Search Trends */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Daily Search Trends</h2>
          <div className="space-y-6">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-gray-400">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium hover:text-blue-600 cursor-pointer">
                      NBA Trade Deadline Updates
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        500K+ searches
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Trending today
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </div>
              ))}
          </div>
        </Card>

        {/* Real-time Search Trends */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            Real-time Search Trends
          </h2>
          <div className="space-y-6">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Search className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <h3 className="font-medium hover:text-blue-600 cursor-pointer">
                      Super Bowl Predictions 2024
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        Breakout
                      </Badge>
                      <span className="text-xs text-gray-500">Last hour</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </div>
              ))}
          </div>
        </Card>

        {/* Recently Trending */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Recently Trending</h2>
          <div className="space-y-6">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <TrendingUp className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <h3 className="font-medium hover:text-blue-600 cursor-pointer">
                      MLB Free Agency News
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        +250%
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Past 24 hours
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TrendingPage;
