import { createContext, useEffect, useState } from "react";
import netlifyidentity from "netlify-identity-widget";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // netlifyidentity.on('init', (user) => {
    //     setUser(user);
    // })
    netlifyidentity.on("login", (user) => {
      setUser(user);
      netlifyidentity.close();
      console.log("login event");
    });

    netlifyidentity.on("logout", () => {
        setUser(null);
        console.log('logout event');
    });

    netlifyidentity.on('init', (user) => {
        setUser(user)
        setAuthReady(true);
        console.log('init event');
    });

    //init netlify identity connection
    netlifyidentity.init();

    return () => {
        netlifyidentity.off('login')
        netlifyidentity.off('logout')
    }
  }, []);

  const login = () => {
    netlifyidentity.open();
  };

  const logout = () => {
    netlifyidentity.logout();
  };

  const context = {
    user,
    login,
    logout,
    authReady
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
