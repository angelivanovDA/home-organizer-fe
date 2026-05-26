import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { AppRoutes } from "@/router/router";
import { ROUTES } from "@/constants/routesConstants";
import type { LoginAuthData } from "@/types";
import { apiUrl } from "@/utils/apiUtils";

function App() {
  const navigate = useNavigate();
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const logoutHandler = useCallback(() => {
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    navigate(ROUTES.HOME);
  }, [navigate]);

  const setAutoLogout = useCallback(
    (milliseconds: number) => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
      logoutTimerRef.current = setTimeout(() => logoutHandler(), milliseconds);
    },
    [logoutHandler],
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!storedToken || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const storedUserId = localStorage.getItem("userId");
    const remainingMilliseconds = new Date(expiryDate).getTime() - Date.now();
    setIsAuth(true);
    setToken(storedToken);
    setUserId(storedUserId);
    setAutoLogout(remainingMilliseconds);

    return () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [logoutHandler, setAutoLogout]);

  const loginHandler = (authData: LoginAuthData) => {
    setAuthLoading(true);
    fetch(apiUrl("/api/auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Could not authenticate you!");
        }
        return res.json() as Promise<{ token: string; userId: string }>;
      })
      .then((resData) => {
        setIsAuth(true);
        setToken(resData.token);
        setAuthLoading(false);
        setUserId(resData.userId);
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiry = new Date(Date.now() + remainingMilliseconds);
        localStorage.setItem("expiryDate", expiry.toISOString());
        setAutoLogout(remainingMilliseconds);
        navigate(ROUTES.DASHBOARD);
      })
      .catch((err: Error) => {
        setIsAuth(false);
        setAuthLoading(false);
        setError(err);
      });
  };

  const signupHandler = (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    setAuthLoading(true);
    fetch(apiUrl("/api/auth/signup"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!",
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating a user failed!");
        }
        return res.json();
      })
      .then(() => {
        setIsAuth(false);
        setAuthLoading(false);
        navigate(ROUTES.LOGIN);
      })
      .catch((err: Error) => {
        setIsAuth(false);
        setAuthLoading(false);
        setError(err);
      });
  };

  return (
    <Layout
      isAuth={isAuth}
      onLogout={logoutHandler}
      error={error}
      onErrorDismiss={() => setError(null)}
    >
      <AppRoutes
        isAuth={isAuth}
        token={token}
        userId={userId}
        authLoading={authLoading}
        onLogin={loginHandler}
        onSignup={signupHandler}
      />
    </Layout>
  );
}

export default App;
