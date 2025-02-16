import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { UserMention } from "@/hooks/useMentions";

interface MentionsPopoverProps {
  users: UserMention[];
  loading: boolean;
  onSelect: (user: UserMention) => void;
}

const MentionsPopover = ({
  users,
  loading,
  onSelect,
}: MentionsPopoverProps) => {
  if (loading) {
    return <div className="p-2 text-sm text-gray-500">Loading...</div>;
  }

  if (users.length === 0) {
    return <div className="p-2 text-sm text-gray-500">No users found</div>;
  }

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandGroup>
        {users.map((user) => (
          <CommandItem
            key={user.id}
            onSelect={() => onSelect(user)}
            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
          >
            <Avatar className="h-6 w-6">
              <img
                src={
                  user.avatar_url ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
                }
                alt={user.username}
              />
            </Avatar>
            <div>
              <div className="font-medium">{user.username}</div>
              <div className="text-sm text-gray-500">{user.full_name}</div>
            </div>
          </CommandItem>
        ))}
        n
      </CommandGroup>
    </Command>
  );
};

export default MentionsPopover;
