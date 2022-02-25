import { Grid } from "react-loader-spinner";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const FacultyProtection = (props) => {
    const [auth, setAuth] = useState(null);
    const router = useRouter();

    // Authorize with the JWT
    useEffect(() => {
        (async () => {
            const authResponse = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/authorize`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            const authorized = await authResponse.json();
            if (authorized.isAuthorized) {
                props.setLoggedInFaculty(authorized.isAuthorized);
            }
            if (authorized.isAuthorized.role === "faculty") {
                setAuth(authorized.isAuthorized);
            } else {
                setAuth(false);
                setTimeout(() => router.replace("/"), 3000);
            }
        })();
    }, []);

    // If successful, return the children
    return (
        <>
            {auth === null ? (
                <div
                    style={{
                        height: "100vh",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Head>
                        <title>
                            Authorizing... | Automating Elective Processing
                        </title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Grid
                        height="100"
                        width="100"
                        color="green"
                        ariaLabel="loading"
                    />
                </div>
            ) : auth === false ? (
                <div
                    style={{
                        height: "100vh",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Head>
                        <title>
                            Access Denied | Automating Elective Processing
                        </title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <h1>Access Denied</h1>
                        <h3>Redirecting to Home in 3 seconds</h3>
                    </div>
                </div>
            ) : (
                props.children
            )}
        </>
    );
};

export default FacultyProtection;
