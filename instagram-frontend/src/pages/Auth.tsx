import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { AuthForm } from "../components/AuthForm";
import { CREATE_PROFILE_MUTATION } from "../graphql/mutations/profile";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const { session, loading } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION);

  const handleAuthSuccess = async (userId: string) => {
    if (isSignUp) {
      const tempUsername = `user_${userId.substring(0, 8)}`;

      try {
        await createProfile({
          variables: {
            id: userId,
            username: tempUsername,
          },
        });
        console.log(`Profile created for new user: ${tempUsername}`);
      } catch (e) {
        console.error("Error creating profile via GraphQL:", e);
        // If this fails, the user is logged in but cannot post due to FK violation
      }
    }

    // The user session is now active, App.tsx will redirect to Home
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <h1 className="text-xl">Checking authentication status...</h1>
      </div>
    );
  }

  if (session) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <AuthForm
        isSignUp={isSignUp}
        onSuccess={handleAuthSuccess}
        onToggle={() => setIsSignUp(!isSignUp)}
      />
    </div>
  );
};

export default Auth;
