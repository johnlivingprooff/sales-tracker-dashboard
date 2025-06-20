import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get Session + User
  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData?.session ?? null);
      setUser(sessionData?.session?.user ?? null);
      setLoading(false);
    };
    init();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Fetch Profile
  useEffect(() => {
    const fetchUserProfile = async (userId) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }
      return data;
    };
    if (user) {
      fetchUserProfile(user.id).then((userProfile) => {
        if (userProfile) {
          setProfile(userProfile);
        }
      });
    } else {
      setProfile(null);
    }
  }, [user]);

  const isAdmin = profile?.role === "admin";

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
  };
  
  const refreshUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
      setUser(data.user);
    }
  };
  
  return (
    <UserContext.Provider
      value={{ session, user, profile, loading, isAdmin, logout, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
