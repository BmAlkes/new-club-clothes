import User from "../types/user.types";
import { createContext, useState } from "react";

interface UserContextProps {
  children: React.ReactNode;
}

interface IUserContext {
  currentUser: User | null;
  isAutheticated: boolean;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  isAutheticated: false,
  loginUser: () => {},
  logoutUser: () => {},
});

const UserContextProvider: React.FC<UserContextProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const isAutheticated = currentUser !== null;

  const loginUser = (user: User) => {
    setCurrentUser(user);
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{ currentUser, isAutheticated, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
