import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/faculty/dashboard/Home.module.css";

export default function Home() {
	return (
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
						<Link href={"/faculty/status/round1"}>
							<a className={styles.navLink}>Round 1 Status</a>
						</Link>
						<Link href={"/faculty/status/round2"}>
							<a className={styles.navLink}>Round 2 Status</a>
						</Link>
					</nav>
				</div>
			</header>
			<main className={styles.main}></main>

			<footer className={styles.footer}>
				<div>Automating Elective Processing</div>
				<div>CSE-F</div>
			</footer>
		</div>
	);
}
