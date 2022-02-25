import {useRouter} from "next/router";
import { useEffect } from "react";

const FacultyProtection = (props) => {
    // Authorize with the JWT

    // If successful, return the children
    return props.children;
};

export default FacultyProtection;
