import Link from "next/link";
import styles from "./styles.module.css";

const NavBar = (props) => {
    return (
        <nav
            style={{
                display: "flex",
                flexWrap: "wrap",
            }}
        >
            <Link href={"/student/dashboard"}>
                <a className={styles.navLink}>Home</a>
            </Link>
            {/* <Link href={"/student/viewFaculties"}>
                <a className={styles.navLink}>View Faculties</a>
            </Link> */}
            <Link href={"/student/roundone"}>
                <a className={styles.navLink}>Round 1</a>
            </Link>
            <Link href={"/student/roundtwo"}>
                <a className={styles.navLink}>Round 2</a>
            </Link>
        </nav>
    );
};

export default NavBar;
