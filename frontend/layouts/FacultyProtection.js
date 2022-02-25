import { Grid } from "react-loader-spinner";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const FacultyProtection = (props) => {
    const [auth, setAuth] = useState(null);

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
            if (authorized.isAuthorized.role == "faculty") {
                setAuth(authorized.isAuthorized);
            } else {
                setAuth(false);
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
                    <h1>Access Denied</h1>
                </div>
            ) : (
                props.children
            )}
        </>
    );
};

export default FacultyProtection;
