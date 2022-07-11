import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";

const useSignUp = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuth();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!createUser) {
        throw new Error("could not complete sign up!");
      }

      updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      dispatch({ type: "LOGIN", payload: createUser.user });
      if (!isCancelled) {
        setIsPending(false);
        setOutcome("User has been successfully created, you can now login");
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
  return { error, isPending, signup, outcome };
};

export default useSignUp;
