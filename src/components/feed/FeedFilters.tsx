import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Clock, Filter } from "lucide-react";

interface FeedFiltersProps {
  onSortChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
  onFilterChange?: (value: string) => void;
}

const FeedFilters = ({
  onSortChange = () => {},
  onSearchChange = () => {},
  onFilterChange = () => {},
}: FeedFiltersProps) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border-b p-3 flex items-center gap-4 sticky top-0 z-10">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search posts..."
          className="pl-10 w-full"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Select defaultValue="latest" onValueChange={onSortChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Latest
            </div>
          </SelectItem>
          <SelectItem value="trending">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        className="w-10 h-10"
        onClick={() => onFilterChange("show-filters")}
      >
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FeedFilters;
