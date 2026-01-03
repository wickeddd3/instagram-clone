import React, { createContext, useContext, useState, useEffect } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { useQuery } from "@apollo/client/react";
import type { ProfileData } from "../types/profile";
import { GET_PROFILE } from "../graphql/queries/profile";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  authUser: ProfileData | undefined;
  authUserLoading: boolean;
  signOut: () => Promise<void>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: { user: User | null }; error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    username: string
  ) => Promise<{ data: { user: User | null }; error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current profile data
  const { data: authUser, loading: authUserLoading } = useQuery<ProfileData>(
    GET_PROFILE,
    {
      variables: { id: user?.id },
    }
  );

  useEffect(() => {
    // Get the initial session status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for authentication changes (login, logout, token refresh)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup the subscription listener on component unmount
    return () => {
      if (listener) listener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email: string, password: string, username: string) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }, // Pass username to user metadata
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        authUser,
        authUserLoading,
        signOut,
        signIn,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
