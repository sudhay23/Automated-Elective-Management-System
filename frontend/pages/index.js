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
        <button
          onClick={() => {
            (async () => {
              const authResponse = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`,
                {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: "testUser@gmail.com",
                    password: "1234",
                  }),
                }
              );
              const authorized = await authResponse.json();
            })();
          }}
        >
          Login
        </button>
        <Link href="/faculty/dashboard">
          <a>Go To Dashboard</a>
        </Link>
        <h1 className={styles.title}>Automated Elective Management - CSE-F</h1>
        <Login />
      </main>
    </div>
  );
}
