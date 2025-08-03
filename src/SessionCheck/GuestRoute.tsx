import { useEffect, useState } from "react";
import { checkSession } from "./sessionUtils";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const verify = async () => {
      const isLoggedIn = await checkSession();
      setAllowed(!isLoggedIn);
    };
    verify();
  }, []);

  if (allowed === null) return <div>Loading...</div>;

  return allowed ? <>{children}</> : <Navigate to="/" />;
};

export default GuestRoute;
