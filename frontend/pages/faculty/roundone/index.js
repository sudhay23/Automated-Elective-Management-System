import FacultyProtection from "../../../layouts/FacultyProtection";
import { useState, useEffect } from "react";
import Switch from "../../../src/components/faculty/switch";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../styles/faculty/dashboard/Home.module.css";

import ControlBar from "../../../src/components/faculty/roundone/ControlBar";

export default function RoundOne(props) {
  const [loggedInFaculty, setLoggedInFaculty] = useState(null);
  const [roundOneStatus, setRoundOneStatus] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faculty/systemstatus`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRoundOneStatus(data.roundOneActive);
      });
  }, []);

  return (
    <FacultyProtection setLoggedInFaculty={setLoggedInFaculty}>
      <div className={styles.container}>
        <Head>
          <title>Faculty Dashboard | Automating Elective Processing</title>
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
              <Link href={"/faculty/status/round2"}>
                <a className={styles.navLink}>Round 2 Status</a>
              </Link>
            </nav>
          </div>
        </header>
        <main className={styles.main}>
          <ControlBar user={{ name: loggedInFaculty?.name }} />
          <div className={styles.main}>
            {roundOneStatus != null ? (
              <div>
                <text className={styles.main}> Toggle Round 1 Status</text>
                <Switch
                  isOn={roundOneStatus}
                  onColor="#009900"
                  handleToggle={async () => {
                    const response = fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faculty/roundone/status`,
                      {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          roundOneActive: roundOneStatus ? false : true,
                        }),
                      }
                    )
                      .then((data) => {
                        return data.json();
                      })
                      .then((val) => {
                        setRoundOneStatus(val.roundOneActive);
                      });
                  }}
                />
                <div>
                  <button
                    onClick={() => {
                      fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faculty/process/roundone`,
                        {
                          credentials: "include",
                        }
                      )
                        .then((res) => {
                          return res.json();
                        })
                        .then((data) => {
                          console.log(data);
                        });
                    }}
                  >
                    Publish Round 1
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}{" "}
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
