import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./UserNav.module.scss";

const UserNav = () => {
  const { user, login, logout, authReady } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    
    // setTimeout(() => {
    //   console.log(!user);
    //   // !user && router.push("/");
    // }, 2000)
  }, []);

  return (
    user && (
      <div className={styles.userWrapper}>
        <div className={styles.user}>
          <img src="/icons/user.svg" alt="icon of a face" />
          <p>{user.user_metadata.full_name}</p>
        </div>
        <button onClick={logout}>
          Log out
          <img src="/icons/logOutArrow.svg" alt="arrow up" />
        </button>
      </div>
    )
  );
};

export default UserNav;
