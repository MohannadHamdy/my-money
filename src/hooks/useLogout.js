import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuth();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });

      if (!isCancelled) {
        setIsPending(false);
        setOutcome("Logged out successfully!");
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    setIsCancelled(false);
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return { error, isPending, logout, outcome };
};
