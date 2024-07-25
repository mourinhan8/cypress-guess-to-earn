import { User } from "../common/types";
import {
  useContext,
  createContext,
  useState
} from "react";

export type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContext = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContext>({ user: null, setUser: () => {} });

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
