import { AuthContextProvider } from "../../contexts/AuthContext";
import { DishesProvider } from "../../contexts/DishesContext";
import Navigation from "../components/Navigation";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <DishesProvider>
        <Component {...pageProps} />
        <Navigation />
      </DishesProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
