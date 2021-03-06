import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Login from "../src/components/homepage/login/Login";
import Signup from "../src/components/homepage/signup/Signup";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title} data-testid="header">Automated Elective Management - CSE-F</h1>
        <Login />
      </main>
    </div>
  );
}
