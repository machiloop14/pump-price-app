import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({ user: null });

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {});

  return (
    <AuthContextProvider.Provider value={user}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
