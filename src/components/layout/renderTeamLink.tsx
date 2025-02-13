import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";

export const renderTeamLink = (name: string, slug: string, league: string) => {
  const navigate = useNavigate();

  return (
    <DropdownMenuItem
      key={slug}
      onClick={() => navigate(`/teams/${league.toLowerCase()}/${slug}`)}
      className="flex items-center gap-2"
    >
      <img
        src={`/${league.toLowerCase()}/${slug}.svg`}
        alt={name}
        className="w-6 h-6"
      />
      {name}
    </DropdownMenuItem>
  );
};
