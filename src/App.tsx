import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/admin/login";
import { ArticleEditor } from "./components/articles/ArticleEditor";
import ArticlePage from "./pages/articles/[slug]";
import Home from "./components/home";
import NFLPage from "./pages/nfl";
import MLBPage from "./pages/mlb";
import NBAPage from "./pages/nba";
import TrendingPage from "./pages/trending";
import NewsPage from "./pages/news";
import LandingPage from "./components/landing/LandingPage";
import { ProfileSettings } from "./components/profile/ProfileSettings";
import AboutPage from "./pages/about";
import TermsPage from "./pages/terms";
import PrivacyPage from "./pages/privacy";
import AdvertisePage from "./pages/advertise";
import HashtagPage from "./pages/hashtag/[tag]";
import { AuthProvider } from "./lib/auth-context";
import { useAuth } from "./lib/auth-context";
import { Toaster } from "@/components/ui/toaster";
import TeamPage from "./pages/teams/[league]/[team]";

// Temporarily disabled auth check
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/admin/login" />;
  return <>{children}</>;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

import BaseLayout from "./components/layout/BaseLayout";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={null}>
        <BaseLayout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <ArticleEditor />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/advertise" element={<AdvertisePage />} />
            <Route path="/hashtag/:tag" element={<HashtagPage />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />

            {/* Protected routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/nfl"
              element={
                <ProtectedRoute>
                  <NFLPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mlb"
              element={
                <ProtectedRoute>
                  <MLBPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/nba"
              element={
                <ProtectedRoute>
                  <NBAPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trending"
              element={
                <ProtectedRoute>
                  <TrendingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news"
              element={
                <ProtectedRoute>
                  <NewsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <ProfileSettings />
                </ProtectedRoute>
              }
            />

            {/* Team routes */}
            <Route
              path="/teams/:league/:team"
              element={
                <ProtectedRoute>
                  <TeamPage />
                </ProtectedRoute>
              }
            />

            {/* Tempo routes for development */}
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" element={<div />} />
            )}

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BaseLayout>
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
