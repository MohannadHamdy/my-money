import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";

const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuth();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const userLogIn = await signInWithEmailAndPassword(auth, email, password);
      console.log(userLogIn.user);
      if (!userLogIn) {
        throw new Error("could not complete login!");
      }

      dispatch({ type: "LOGIN", payload: userLogIn.user });
      if (!isCancelled) {
        setIsPending(false);
        setOutcome("Logged in successfully!");
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
  return { error, isPending, login, outcome };
};

export default useLogin;
