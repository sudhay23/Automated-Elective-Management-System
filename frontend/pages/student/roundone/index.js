import { Oval } from "react-loader-spinner";
import StudentProtection from "../../../layouts/StudentProtection";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../../../src/components/student/NavBar";
import ControlBar from "../../../src/components/student/dashboard/ControlBar";
import CourseTable from "../../../src/components/student/dashboard/CourseTable";
import styles from "../../../styles/faculty/dashboard/Home.module.css";

// Mock data
// import mockCourses from "../../../mockdata/courses.json";

import { useState, useEffect } from "react";

export default function RoundOne(props) {
    const [roundOneAllowed, setRoundOneAllowed] = useState(null);

    const [loggedInStudent, setLoggedInStudent] = useState(null);

    // State variable to switch modal to add course and hold courses
    const [courses, setCourses] = useState(props.courses);

    // State variable to decide if AddCourse Form is in UPDATE mode

    useEffect(async () => {
        const coursesRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/courses`,
            { credentials: "include" }
        );
        // console.log(coursesRes);
        if (coursesRes.status == 200) {
            const courses = await coursesRes.json();
            setCourses(courses);
        } else {
            setCourses([]);
        }
    }, []);

    // Check if this user is allowed to proceed in Round 1
    useEffect(() => {
        console.log(loggedInStudent);
        if (loggedInStudent) {
            fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/status/roundone/${loggedInStudent.user}`,
                {
                    credentials: "include",
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    setRoundOneAllowed(data.roundOneAllowed);
                });
        }
    }, [loggedInStudent]);

    return (
        <StudentProtection setLoggedInStudent={setLoggedInStudent}>
            <div className={styles.container}>
                <Head>
                    <title>Round One | Automating Elective Processing</title>
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
                        <h2 className={styles.pageTitle}>Round One</h2>
                    </div>
                    <div className={styles.headingRight}>
                        <NavBar />
                    </div>
                </header>
                <main className={styles.main}>
                    {roundOneAllowed == null ? (
                        <div
                            style={{
                                height: "60vh",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Head>
                                <title>
                                    Checking Status... | Automating Elective
                                    Processing
                                </title>
                                <link rel="icon" href="/favicon.ico" />
                            </Head>
                            <Oval
                                height="100"
                                width="100"
                                color="green"
                                ariaLabel="loading"
                            />
                        </div>
                    ) : roundOneAllowed ? (
                        <>
                            {/* Props will have to obtained from Auth service */}
                            <ControlBar
                                user={{ name: loggedInStudent?.name }}
                            />

                            {/* Table of courses offered */}
                            {courses?.length > 0 ? (
                                <CourseTable
                                    courses={courses}
                                    setCourses={setCourses}
                                    user={loggedInStudent}
                                />
                            ) : (
                                "No Courses on Database"
                            )}
                        </>
                    ) : (
                        <h4>
                            Round one already done | "TODO" - Show saved
                            preferences
                        </h4>
                    )}
                </main>

                <footer className={styles.footer}>
                    <div>Automating Elective Processing</div>
                    <div>CSE-F</div>
                </footer>
            </div>
        </StudentProtection>
    );
}
