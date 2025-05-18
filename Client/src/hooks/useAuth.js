import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  useEffect(() => {
    // Add debugging to track when useAuth is called and what it returns
    console.log("useAuth hook called, returning:", context);
  }, [context]);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
