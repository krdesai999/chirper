import { createContext, useContext, useState } from "react";

const AuthContext = createContext();


export const Auth = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
