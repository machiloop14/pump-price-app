// // context/auth.js
// import { onAuthStateChanged, User } from "firebase/auth";
// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { auth } from "../firebaseConfig";

// // ✅ define context type
// type AuthContextType = {
//   user: User | null;
// };

// const AuthContext = createContext<AuthContextType>({ user: null });

// // ✅ provider component props
// type AuthProviderProps = {
//   children: ReactNode;
// };

// export const AuthContextProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (authUser) => {
//       setUser(authUser);
//     });
//     return unsubscribe;
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// export default AuthContextProvider; // ✅ add this
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebaseConfig";

type AuthContextType = {
  user: User | null;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: async () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
