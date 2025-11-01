"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from '@/app/backend/client';



interface AuthContextType {
  session: null | undefined;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error?: string; data?: any }>
  logIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; data?: any }>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<null | undefined>(undefined)

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try{
      const  {data, error } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            }}});
      if (error) {
        console.error("Error signing up:", error.message)
        return {success : false, error: error.message}
      } else {
        console.log("Sign up successful:", data)
        return {success : true, data: data}
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err)
      return {success : false, error: err instanceof Error ? err.message : "An unknown error occurred"}
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) {
        console.error("Error logging in:", error.message)
        return {success : false, error: error.message}
      } else {
        console.log("Login successful:", data)
        return {success : true, data: data}
      }
    }
    catch (err) {
      console.error("An unexpected error occurred:", err)
      return {success : false, error: err instanceof Error ? err.message : "An unknown error occurred"}
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event: string, session: any) => {
      setSession(session);
    });
  }, []);

  const logOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error.message)
    } else {
      setSession(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        signUp,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
