import StudentProtection from "../../../layouts/StudentProtection";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ControlBar from "../../../src/components/student/dashboard/ControlBar";
import NavBar from "../../../src/components/student/NavBar";
import styles from "../../../styles/student/dashboard/Home.module.css";

// Mock data
// import mockCourses from "../../../mockdata/courses.json";

import { useState, useEffect } from "react";

export default function Home(props) {
    const [loggedInStudent, setLoggedInStudent] = useState(null);

    return (
        <StudentProtection setLoggedInStudent={setLoggedInStudent}>
            <div className={styles.container}>
                <Head>
                    <title>
                        Student Dashboard | Automating Elective Processing
                    </title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <header className={styles.header}>
                    <div className={styles.headingLeft}>
                        <Image
                            src="/amritaLogo.png"
                            alt="Amrita Logo"
                            className={styles.logo}
                            width={300}
                            height={100}
                        />
                        <h2 className={styles.pageTitle}>Student Dashboard</h2>
                    </div>
                    <div className={styles.headingRight}>
                        <NavBar />
                    </div>
                </header>
                <main className={styles.main}>
                    {/* Props will have to obtained from Auth service */}
                    <ControlBar
                        user={{
                            name: loggedInStudent?.name,
                            cgpa: loggedInStudent?.cgpa,
                        }}
                    />
                    <div className={styles.roundNavigator}>
                        <Link href="/student/roundone">
                            <a className={styles.roundBtn}>
                                Goto <strong>Round 1</strong>
                            </a>
                        </Link>
                        <br />
                        <Link href="/student/roundtwo">
                            <a className={styles.roundBtn}>
                                Goto <strong>Round 2</strong>
                            </a>
                        </Link>
                    </div>
                </main>

                <footer className={styles.footer}>
                    <div>Automating Elective Processing</div>
                    <div>CSE-F</div>
                </footer>
            </div>
        </StudentProtection>
    );
}
