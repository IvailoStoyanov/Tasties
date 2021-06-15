import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import ActiveLink from "../ActiveLink/ActiveLink";

import styles from "./Navigation.module.scss";

const Navigation = () => {
  const { user } = useContext(AuthContext);
  return (
    user &&
    <>
      <style jsx>{`
        div {
          opacity: 0.5;
        }
        div.active {
          opacity: 1;
        }
      `}</style>
      <nav className={styles.nav}>
        <ul>
          <li>
            <ActiveLink href="/" activeClassName="active">
              <div>
                <img src="/icons/home.svg" />
                <a>Home</a>
              </div>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/missingIngredients" activeClassName="active">
              <div>
                <img src="/icons/list.svg" />
                <a>Shopping list</a>
              </div>
            </ActiveLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
