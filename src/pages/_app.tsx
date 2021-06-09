// import { AuthProvider } from "../hooks/useAuth";
import { DishesProvider } from "../../contexts/DishesContext";
import Navigation from "../components/Navigation"


import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    // <AuthProvider>
    // </AuthProvider>
    <DishesProvider>
      <Component {...pageProps} />
      <Navigation />
    </DishesProvider>
  );
}

export default MyApp;
