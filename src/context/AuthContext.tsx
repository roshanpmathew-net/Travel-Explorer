import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface User {
  name: string;
  img_url: string | null;
  islogged: boolean;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
    const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    const firstName = userData.name.split(" ")[0];
    toast.success(`${firstName}, Logged in successfully`);
  };

  const logout = () => {
  setUser(null);
  localStorage.removeItem("user");
  toast.success("Logged out successfully");
};

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
