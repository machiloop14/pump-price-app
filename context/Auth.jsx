// context/auth.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ user: null });

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider; // ✅ add this
