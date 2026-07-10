import { createContext, useContext } from "react";
import type { Session, User } from "@supabase/supabase-js";
import type { Profile } from "./types";

export interface AuthContextType {
  session: Session | null;
  authUser: User | null;
  authUserLoading: boolean;
  authProfile: Profile | undefined;
  authProfileLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
