import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: string;
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "dhanam_users";
const SESSION_KEY = "dhanam_session";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch { /* ignore */ }
    }
  }, []);

  const getUsers = (): Record<string, { profile: UserProfile; password: string }> => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
    } catch {
      return {};
    }
  };

  const login = (email: string, password: string): boolean => {
    const users = getUsers();
    const entry = users[email.toLowerCase()];
    if (entry && entry.password === password) {
      setUser(entry.profile);
      localStorage.setItem(SESSION_KEY, JSON.stringify(entry.profile));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const users = getUsers();
    const key = email.toLowerCase();
    if (users[key]) return false;

    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name,
      email: key,
      createdAt: new Date().toISOString(),
    };
    users[key] = { profile, password };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUser(profile);
    localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    const users = getUsers();
    if (users[user.email]) {
      users[user.email].profile = updated;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
