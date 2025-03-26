
import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "@/services/auth-service";
import { toast } from "sonner";
import { UserRole, User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: UserRole) => Promise<void>;
  signOut: () => void;
  refreshUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = AuthService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      // Optionally refresh user data from backend
      AuthService.refreshUserData()
        .then(updatedUser => {
          if (updatedUser) {
            setUser(updatedUser);
          }
        })
        .catch(() => {/* Error handled by axios interceptor */});
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await AuthService.login({ email, password });
      setUser(response.user);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await AuthService.register({ email, password, role });
      setUser(response.user);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = (): void => {
    AuthService.logout();
    setUser(null);
    toast.success("Signed out successfully");
  };

  const refreshUser = async (): Promise<User | null> => {
    try {
      const updatedUser = await AuthService.refreshUserData();
      if (updatedUser) {
        setUser(updatedUser);
      }
      return updatedUser;
    } catch (error) {
      console.error("Error refreshing user:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
