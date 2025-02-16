import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card } from "@/components/ui/card";

type Section = "general" | "settings" | "account";

export function ProfileSettings() {
  const [activeSection, setActiveSection] = useState<Section>("general");
  const { user, signOut, updateAvatar } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    username: user?.user_metadata?.username || "",
    email: user?.email || "",
    fullName: user?.user_metadata?.full_name || "",
    bio: user?.user_metadata?.bio || "",
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      await updateAvatar(file);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSave = async (section: Section) => {
    setLoading(true);
    try {
      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          ...user?.user_metadata,
          ...profile,
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={
                  user?.user_metadata?.avatar_url ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`
                }
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Change Avatar
                </label>
              </div>
            </div>
            <h2 className="text-2xl font-bold">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Display Name
                </label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea className="w-full p-2 border rounded h-24" />
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Notifications
                </label>
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Receive email notifications</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Privacy
                </label>
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Make profile private</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "account":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Account Management</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Change Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  placeholder="New password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Delete Account
                </label>
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <Card className="w-64 h-fit p-4 bg-gray-50">
          <nav className="space-y-1">
            {[
              { id: "general", label: "General" },
              { id: "settings", label: "Settings" },
              { id: "account", label: "Account" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeSection === item.id ? "bg-white font-medium text-black" : "text-black hover:bg-white"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Main Content */}
        <Card className="flex-1 p-6">{renderContent()}</Card>
      </div>
    </div>
  );
}
