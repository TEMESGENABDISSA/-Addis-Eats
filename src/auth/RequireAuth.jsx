import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "./AuthContext";

function RequireAuth() {
  const { user } = useAuth();

  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/signin"
        state={{
          from: location,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}

export default RequireAuth;
