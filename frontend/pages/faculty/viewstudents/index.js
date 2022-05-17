import FacultyProtection from "../../../layouts/FacultyProtection";
import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../styles/faculty/dashboard/Home.module.css";

import ControlBar from "../../../src/components/faculty/roundone/ControlBar";

export default function RoundOne(props) {
	const [loggedInFaculty, setLoggedInFaculty] = useState(null);
	const [allStudents, setAllStudents] = useState(null);
	const router = useRouter();

	useEffect(async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faculty/electiveassigned`,
			{ credentials: "include" }
		);
		const allStudents = await response.json();

		// Replace Course ID with Name
		(async () => {
			for (let i = 0; i < allStudents.length; i++) {
				if (allStudents[i].electiveAssigned == "NONE") {
					continue;
				} else {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faculty/courses/${allStudents[i].electiveAssigned}`,
						{ credentials: "include" }
					);
					const course = await response.json();
					allStudents[
						i
					].electiveAssigned = `${course.courseCode} - ${course.courseName}`;
				}
			}
			setAllStudents(allStudents);
		})();
	}, []);

	return (
		<FacultyProtection setLoggedInFaculty={setLoggedInFaculty}>
			<div className={styles.container}>
				<Head>
					<title>
						Student Allocation Status | Faculty Dashboard |
						Automating Elective Processing
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
					<ControlBar user={{ name: loggedInFaculty?.name }} />
					<div className={styles.main}>
						{allStudents == null ? (
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
						) : (
							<>
								<div className={styles.pageName} align="center">
									<h3>Student Elective Status</h3>
								</div>
								<div className={styles.container}>
									<table align="center">
										<thead>
											<tr>
												<th className={styles.snoCell}>
													S.no
												</th>
												<th
													className={
														styles.courseCodeCell
													}
												>
													Name
												</th>
												<th
													className={
														styles.courseNameCell
													}
												>
													Email
												</th>
												<th
													className={
														styles.courseNameCell
													}
												>
													Elective Assigned
												</th>
											</tr>
										</thead>
										<tbody>
											{allStudents.map((student, idx) => (
												<tr key={idx}>
													<td
														className={
															styles.snoCellData
														}
													>
														{idx + 1}
													</td>
													<td
														className={
															styles.courseCodeCellData
														}
													>
														{student.name}
													</td>
													<td
														className={
															styles.courseNameCellData
														}
													>
														{student.email}
													</td>
													<td
														className={
															styles.courseNameCellData
														}
													>
														{
															student.electiveAssigned
														}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</>
						)}
					</div>
				</main>

				<footer className={styles.footer}>
					<div>Automating Elective Processing</div>
					<div>CSE-F</div>
				</footer>
			</div>
		</FacultyProtection>
	);
}
