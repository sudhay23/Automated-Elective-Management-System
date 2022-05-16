import { Oval } from "react-loader-spinner";
import StudentProtection from "../../../layouts/StudentProtection";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../../../src/components/student/NavBar";
import ControlBar from "../../../src/components/student/dashboard/ControlBar";
import CourseTable from "../../../src/components/student/dashboard/CourseTable";
import styles from "../../../styles/student/roundone/RoundOne.module.css";

// Mock data
// import mockCourses from "../../../mockdata/courses.json";

import { useState, useEffect } from "react";

export default function RoundOne(props) {
  const [roundOneAllowed, setRoundOneAllowed] = useState(null);
  const [loggedInStudent, setLoggedInStudent] = useState(null);
  const [frozenPreferences, setFrozenPreferences] = useState(null);
  const [allottedPreference, setAllottedPreference] = useState(null);
  useEffect(() => {
    if (loggedInStudent) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/electedpreference/${loggedInStudent.user}`,
        {
          credentials: "include",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // set allotted preference
          setAllottedPreference(data.electivePreference);
        });
    }
  }, [loggedInStudent]);

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
    // console.log(loggedInStudent);
    if (loggedInStudent) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/status/roundone/${loggedInStudent.user}`,
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.roundOneAllowed == true) {
            setFrozenPreferences([]);
          }
          setRoundOneAllowed(data.roundOneAllowed);
        });
    }
  }, [loggedInStudent]);

  // If the student is already done with round 1, show the frozen preferences
  useEffect(async () => {
    if (roundOneAllowed === false) {
      // Find preference ID list
      const response1 = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/preflist/1/${loggedInStudent.user}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data1 = await response1.json();
      if (response1.ok && data1.flag == 0) {
        // TODO-Find the corresponding Courses to IDs
        const response2 = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/fromIds/`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idArr: data1.data.coursePreferences,
            }),
          }
        );
        const data2 = await response2.json();
        setFrozenPreferences(data2.courseArr);
      } else {
        setFrozenPreferences([]);
        return;
      }
    }
  }, [roundOneAllowed]);

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
          {roundOneAllowed == null || frozenPreferences == null ? (
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
                  Checking Status... | Automating Elective Processing
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
                user={{
                  name: loggedInStudent?.name,
                  cgpa: loggedInStudent?.cgpa,
                }}
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
            // Already Frozen Preferences
            <div className={styles.preferences}>
              <div className={styles.allottedPreference}>
                <h1>Alotted Course : {allottedPreference} </h1>
              </div>

              <h2 style={{ margin: 0 }}>
                You have already frozen the following courses
              </h2>
              <h3>Frozen number of courses: {frozenPreferences.length}</h3>
              <br />
              <ul className={styles.preferencesList}>
                {frozenPreferences.map((coursePref, idx) => (
                  <li key={idx} className={styles.preferencesItem}>
                    {idx + 1}. {coursePref.courseCode} - {coursePref.courseName}{" "}
                    (Credits: {coursePref.credits}; Min.CGPA:{" "}
                    {coursePref.minCGPA})
                  </li>
                ))}
              </ul>
            </div>
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
