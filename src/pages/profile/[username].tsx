import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import ProfileTemplate from "@/components/profile/ProfileTemplate";
import { useFollows } from "@/hooks/useFollows";

interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

interface ProfilePost {
  id: string;
  content: string;
  created_at: string;
  image_url?: string;
  likes: number;
  comments: number;
  shares: number;
  user_id: string;
  author: {
    username: string;
    avatar_url?: string;
    full_name: string;
  };
}

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<ProfilePost[]>([]);
  const [loading, setLoading] = useState(true);
  const { followers, following, isFollowing, followUser, unfollowUser } =
    useFollows(profile?.id);

  useEffect(() => {
    if (username) {
      fetchProfile();
    }
  }, [username]);

  const fetchProfile = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select(
          `
          *,
          author:profiles!posts_user_id_fkey(username, avatar_url, full_name)
        `,
        )
        .eq("user_id", profileData.id)
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;
      setPosts(postsData || []);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <ProfileTemplate
      profile={profile}
      posts={posts}
      stats={{
        followers: followers.length,
        following: following.length,
        posts: posts.length,
      }}
      isFollowing={isFollowing}
      onFollowToggle={
        profile?.id
          ? () =>
              isFollowing ? unfollowUser(profile.id) : followUser(profile.id)
          : undefined
      }
    />
  );
};

export default ProfilePage;
