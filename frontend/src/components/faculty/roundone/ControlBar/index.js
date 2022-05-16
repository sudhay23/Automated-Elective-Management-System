import styles from "./styles.module.css";
import { useRouter } from "next/router";

const ControlBar = (props) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.welcomeMsg}>
          Hello, <strong>{props.user?.name}</strong>
        </div>
        <button
          className={styles.logoutBtn}
          onClick={async () => {
            // Clear the cookie containing Auth token
            await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/logout`,
              {
                method: "POST",
                credentials: "include",
              }
            ).then((response) => {
              router.replace("/");
            });
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
