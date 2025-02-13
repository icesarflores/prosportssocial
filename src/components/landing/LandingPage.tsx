import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";

const LandingPage = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-[1000px] w-full">
        <div className="flex-1">
          <h1 className="text-[42px] font-bold text-[#1877f2] mb-4">
            PROSPORTSTALK
          </h1>
          <h2 className="text-[28px] leading-8 text-black pr-6">
            Connect with other sports enthusiasts and the world around you.
          </h2>
        </div>

        <div className="w-full md:w-[396px]">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[50px] text-[17px] px-4"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-[50px] text-[17px] px-4"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-[48px] text-[20px] font-bold bg-[#1877f2] hover:bg-[#166fe5]"
              >
                Log In
              </Button>
              <div className="text-center">
                <a
                  href="#"
                  className="text-[#1877f2] text-[14px] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <hr className="my-5" />
              <div className="text-center">
                <Button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="px-4 h-[48px] text-[17px] font-bold bg-[#42b72a] hover:bg-[#36a420]"
                >
                  Create new account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
