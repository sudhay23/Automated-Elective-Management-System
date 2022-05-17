import FacultyProtection from "../../../layouts/FacultyProtection";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ControlBar from "../../../src/components/faculty/dashboard/ControlBar";
import AddCourseModal from "../../../src/components/faculty/dashboard/AddCourseModal";
import CourseTable from "../../../src/components/faculty/dashboard/CourseTable";
import styles from "../../../styles/faculty/dashboard/Home.module.css";

// Mock data
// import mockCourses from "../../../mockdata/courses.json";

import { useState, useEffect } from "react";

export default function Home(props) {
	const [loggedInFaculty, setLoggedInFaculty] = useState(null);

	// State variable to switch modal to add course and hold courses
	const [showAddCourse, setShowAddCourse] = useState(false);
	const [courses, setCourses] = useState(props.courses);

	// State variable to decide if AddCourse Form is in UPDATE mode
	const [updateCourse, setUpdateCourse] = useState(null);

	// Hide or show scrollbar on modal shown
	useEffect(() => {
		if (showAddCourse) {
			window.scroll({ top: 0 });
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [showAddCourse]);
	useEffect(async () => {
		const coursesRes = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faculty/courses`,
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

	return (
		<FacultyProtection setLoggedInFaculty={setLoggedInFaculty}>
			<div className={styles.container}>
				<Head>
					<title>
						Faculty Dashboard | Automating Elective Processing
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
						<h2 className={styles.pageTitle}>Faculty Dashboard</h2>
					</div>
					<div className={styles.headingRight}>
						<nav
							style={{
								display: "flex",
								flexWrap: "wrap",
							}}
						>
							<Link href={"/faculty/dashboard"}>
								<a className={styles.navLink}>Home</a>
							</Link>
							<Link href={"/faculty/viewstudents"}>
								<a className={styles.navLink}>View Students</a>
							</Link>
							<Link href={"/faculty/roundone"}>
								<a className={styles.navLink}>Round 1 Status</a>
							</Link>
							<Link href={"/faculty/roundone"}>
								<a className={styles.navLink}>Round 2 Status</a>
							</Link>
						</nav>
					</div>
				</header>
				<main className={styles.main}>
					{/* Props will have to obtained from Auth service */}
					<ControlBar
						setShowAddCourse={setShowAddCourse}
						user={{ name: loggedInFaculty?.name }}
					/>

					{/* Add Course Modal component */}
					{showAddCourse ? (
						<AddCourseModal
							courses={courses}
							setCourses={setCourses}
							setShowAddCourse={setShowAddCourse}
							updateCourse={updateCourse}
							setUpdateCourse={setUpdateCourse}
						/>
					) : (
						""
					)}

					{/* Table of courses offered */}
					{courses?.length > 0 ? (
						<CourseTable
							courses={courses}
							setCourses={setCourses}
							setUpdateCourse={setUpdateCourse}
							setShowAddCourse={setShowAddCourse}
						/>
					) : (
						"No Courses on Database"
					)}
				</main>

				<footer className={styles.footer}>
					<div>Automating Elective Processing</div>
					<div>CSE-F</div>
				</footer>
			</div>
		</FacultyProtection>
	);
}
