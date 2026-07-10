import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/shared/lib/supabase";
import { AuthContext } from "./AuthContext";
import { useProfileById } from "./useProfileById";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authUserLoading, setAuthUserLoading] = useState(true);

  // Fetch current profile data
  const { profile, loading: profileLoading } = useProfileById({
    userId: authUser?.id ?? "",
  });

  useEffect(() => {
    // Get the initial session status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthUser(session?.user ?? null);
      setAuthUserLoading(false);
    });

    // Listen for authentication changes (login, logout, token refresh)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setAuthUser(session?.user ?? null);
        setAuthUserLoading(false);
      },
    );

    // Cleanup the subscription listener on component unmount
    return () => {
      if (listener) listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      authUser,
      authUserLoading,
      authProfile: profile,
      authProfileLoading: profileLoading,
    }),
    [session, authUser, authUserLoading, profile, profileLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
