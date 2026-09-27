import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function signIn(name) {
    setUser({
      name: name,
    });
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
