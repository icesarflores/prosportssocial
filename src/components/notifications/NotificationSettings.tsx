import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, BellOff } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export function NotificationSettings() {
  const { permission, subscription, requestPermission, unsubscribe } =
    usePushNotifications();
  const [settings, setSettings] = useState({
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
    gameUpdates: true,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Push Notifications</h2>
          <p className="text-sm text-gray-500">
            Receive notifications even when you're not using the app
          </p>
        </div>
        {permission === "default" ? (
          <Button
            onClick={requestPermission}
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Enable Notifications
          </Button>
        ) : permission === "granted" && subscription ? (
          <Button
            variant="outline"
            onClick={unsubscribe}
            className="flex items-center gap-2"
          >
            <BellOff className="h-4 w-4" />
            Disable Notifications
          </Button>
        ) : null}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="likes">Likes</Label>
          <Switch
            id="likes"
            checked={settings.likes}
            onCheckedChange={() => handleToggle("likes")}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="comments">Comments</Label>
          <Switch
            id="comments"
            checked={settings.comments}
            onCheckedChange={() => handleToggle("comments")}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="follows">New Followers</Label>
          <Switch
            id="follows"
            checked={settings.follows}
            onCheckedChange={() => handleToggle("follows")}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="mentions">Mentions</Label>
          <Switch
            id="mentions"
            checked={settings.mentions}
            onCheckedChange={() => handleToggle("mentions")}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="gameUpdates">Game Updates</Label>
          <Switch
            id="gameUpdates"
            checked={settings.gameUpdates}
            onCheckedChange={() => handleToggle("gameUpdates")}
          />
        </div>
      </div>
    </Card>
  );
}
