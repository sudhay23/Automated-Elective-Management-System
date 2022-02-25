import styles from "./styles.module.css";
import { useRouter } from "next/router";

const ControlBar = (props) => {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <button
                className={styles.newCourseBtn}
                onClick={() => props.setShowAddCourse((x) => !x)}
            >
                Add New Course
            </button>
            <div>
                <div className={styles.welcomeMsg}>
                    Hello, <strong>{props.user?.name}</strong>
                </div>
                <button
                    className={styles.logoutBtn}
                    onClick={() => {
                        // TODO
                        // Clear the cookie containing Auth token by resetting expiry to past
                        fetch(
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/logout`
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
