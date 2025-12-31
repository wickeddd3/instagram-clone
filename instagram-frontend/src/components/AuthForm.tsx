import { useState } from "react";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import type { User } from "@supabase/supabase-js";

interface AuthFormProps {
  isSignUp: boolean;
  onSuccess: (user: User, username: string) => void;
  onToggle: () => void;
}

export const AuthForm = ({ isSignUp, onSuccess, onToggle }: AuthFormProps) => {
  const { signIn, signUp } = useAuth();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Only for Sign Up
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setMessage("");

    try {
      if (isSignUp) {
        // --- SIGN UP LOGIC ---
        if (!username) throw new Error("Username is required for signup.");

        const { data, error } = await signUp(email, password, username);

        if (error) throw error;

        // Supabase sends a confirmation email.
        setMessage(
          "Success! Check your email to confirm your account, then log in."
        );

        // On successful sign-in, trigger the success callback with the user's ID
        if (data.user) {
          onSuccess(data.user, username);
        }
      } else {
        // --- SIGN IN LOGIC ---
        const { error } = await signIn(email, password);

        if (error) throw error;
      }
    } catch (error: any) {
      setMessage(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm border border-gray-800 p-8 rounded-lg shadow-xl flex flex-col items-center bg-[#1c1c1c]">
      <h1
        className="text-4xl font-bold mb-6 text-white"
        style={{ fontFamily: "Grand Hotel, cursive" }}
      >
        Instagram
      </h1>

      {message && (
        <div
          className={`p-2 mb-4 w-full text-sm text-center rounded ${
            message.includes("Success")
              ? "bg-green-600/30 text-green-300"
              : "bg-red-600/30 text-red-300"
          }`}
        >
          {message}
        </div>
      )}

      {isSignUp && (
        <div className="relative w-full mb-3">
          <UserIcon
            size={18}
            className="absolute left-3 top-2.5 text-gray-500"
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 pl-10 bg-gray-900 border border-gray-700 rounded text-sm text-white focus:border-blue-500"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value.replace(/\s/g, "").toLowerCase())
            } // Enforce valid username
          />
        </div>
      )}

      <div className="relative w-full mb-3">
        <Mail size={18} className="absolute left-3 top-2.5 text-gray-500" />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 pl-10 bg-gray-900 border border-gray-700 rounded text-sm text-white focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="relative w-full mb-5">
        <Lock size={18} className="absolute left-3 top-2.5 text-gray-500" />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 pl-10 bg-gray-900 border border-gray-700 rounded text-sm text-white focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleAuth}
        disabled={loading || !email || !password || (isSignUp && !username)}
        className="w-full bg-[#0095f6] text-white py-2 rounded font-semibold text-sm hover:bg-[#1877f2] disabled:opacity-50 transition"
      >
        {loading ? "Processing..." : isSignUp ? "Sign Up" : "Log In"}
      </button>

      <div className="mt-6 text-sm text-gray-400">
        {isSignUp ? "Have an account?" : "Don't have an account?"}
        <button
          onClick={onToggle}
          className="text-[#0095f6] ml-2 font-semibold hover:text-white transition"
        >
          {isSignUp ? "Log In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};
