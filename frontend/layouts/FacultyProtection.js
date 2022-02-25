import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FacultyProtection = (props) => {
    const [auth, setAuth] = useState(null);
    useEffect(() => {}, []);

    // Authorize with the JWT

    // If successful, return the children
    return props.children;
};

export default FacultyProtection;
