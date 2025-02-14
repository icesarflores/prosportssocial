import { useNavigate } from "react-router-dom";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface TeamLinkProps {
  name: string;
  slug: string;
  league: string;
}

export const TeamLink = ({ name, slug, league }: TeamLinkProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenuItem
      onClick={() =>
        navigate(`/teams/${league.toLowerCase()}/${slug.toLowerCase()}`)
      }
      className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm text-sm"
    >
      <img
        src={`/${league.toLowerCase()}/${slug}.svg`}
        alt={name}
        className="w-6 h-6"
        onError={(e) => {
          e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;
        }}
      />
      {name}
    </DropdownMenuItem>
  );
};
