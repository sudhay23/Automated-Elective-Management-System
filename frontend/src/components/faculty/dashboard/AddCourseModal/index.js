import styles from "./styles.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AddCourseModal = (props) => {
    const router = useRouter();
    const [courseCode, setCourseCode] = useState("");
    const [courseName, setCourseName] = useState("");
    const [department, setDepartment] = useState("");
    const [addedBy, setAddedBy] = useState("");
    const [minCap, setMinCap] = useState("");
    const [maxCap, setMaxCap] = useState("");
    const [credits, setCredits] = useState("");
    const [minCGPA, setMinCGPA] = useState("");
    const [preRequisites, setPreRequisites] = useState("");
    const formRef = useRef();

    // If we are in UPDATE mode, prefill all the fields
    useEffect(() => {
        if (props.updateCourse) {
            setCourseCode(props.updateCourse.courseCode);
            setCourseName(props.updateCourse.courseName);
            setDepartment(props.updateCourse.department);
            setAddedBy(props.updateCourse.addedBy);
            setMinCap(props.updateCourse.minCap);
            setMaxCap(props.updateCourse.maxCap);
            setCredits(props.updateCourse.credits);
            setMinCGPA(props.updateCourse.minCGPA);
            setPreRequisites(props.updateCourse.preRequisites);
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.addCourseForm}>
                <div className={styles.formHeader}>
                    <FaArrowLeft
                        style={{ cursor: "pointer", fontSize: 28 }}
                        onClick={() => {
                            props.setShowAddCourse((x) => !x);
                            if (props.updateCourse) {
                                props.setUpdateCourse(null);
                            }
                        }}
                    />
                </div>
                <form action="#" className={styles.formContent} ref={formRef}>
                    <input
                        required
                        type="text"
                        title="Course Code"
                        className={styles.inputField}
                        value={courseCode}
                        placeholder="Enter Course Code"
                        onChange={(e) => {
                            setCourseCode(e.target.value);
                        }}
                    />
                    <input
                        required
                        type="text"
                        className={styles.inputField}
                        title="Course Name"
                        value={courseName}
                        placeholder="Enter Course Name"
                        onChange={(e) => {
                            setCourseName(e.target.value);
                        }}
                    />
                    <input
                        required
                        type="text"
                        title="Department"
                        className={styles.inputField}
                        value={department}
                        placeholder="Enter Department"
                        onChange={(e) => {
                            setDepartment(e.target.value);
                        }}
                    />
                    <input
                        required
                        title="Added By (full name to display)"
                        type="text"
                        className={styles.inputField}
                        value={addedBy}
                        placeholder="Added By (full name to display)"
                        onChange={(e) => {
                            setAddedBy(e.target.value);
                        }}
                    />
                    <input
                        required
                        type="number"
                        title="Minimum Cap"
                        className={styles.inputField}
                        value={minCap}
                        placeholder="Enter Minimum Cap"
                        onChange={(e) => {
                            setMinCap(e.target.value);
                        }}
                    />
                    <input
                        required
                        title="Maximum Cap"
                        type="number"
                        className={styles.inputField}
                        value={maxCap}
                        placeholder="Enter Maximum Cap"
                        onChange={(e) => {
                            setMaxCap(e.target.value);
                        }}
                    />
                    <input
                        required
                        type="number"
                        title="Credits"
                        className={styles.inputField}
                        value={credits}
                        placeholder="Enter Credits"
                        onChange={(e) => {
                            setCredits(e.target.value);
                        }}
                    />
                    <input
                        required
                        type="number"
                        title="Min. CGPA"
                        className={styles.inputField}
                        value={minCGPA}
                        placeholder="Enter Minimum CGPA"
                        onChange={(e) => {
                            setMinCGPA(e.target.value);
                        }}
                    />
                    <input
                        required
                        type="text"
                        className={styles.inputField}
                        title="Prerequisite Course Codes"
                        value={preRequisites}
                        placeholder="Enter Prerequisite Course Codes (comma seperated)"
                        onChange={(e) => {
                            setPreRequisites(e.target.value);
                        }}
                    />
                    <input data-testid="submit-button"
                        type="submit"
                        value="Submit"
                        className={styles.submitBtn}
                        onClick={async (e) => {
                            e.preventDefault();
                            if (formRef.current.reportValidity()) {
                                const newCourse = {
                                    courseCode,
                                    courseName,
                                    department,
                                    addedBy,
                                    addedOn: new Date(),
                                    minCap,
                                    maxCap,
                                    credits,
                                    minCGPA,
                                    preRequisites,
                                };

                                if (props.updateCourse) {
                                    // Update Mode
                                    fetch(
                                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faculty/course/${props.updateCourse._id}`,
                                        {
                                            method: "PUT",
                                            credentials: "include",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify({
                                                updatedCourse: newCourse,
                                            }),
                                        }
                                    )
                                        .then((res) => {
                                            router.reload();
                                            // props.setShowAddCourse(false);
                                        })
                                        .catch((err) => {
                                            console.log(
                                                "Error in saving new course"
                                            );
                                        });
                                } else {
                                    props.setCourses((courses) => [
                                        ...courses,
                                        newCourse,
                                    ]);
                                    // Create Mode
                                    fetch(
                                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faculty/courses`,
                                        {
                                            method: "POST",
                                            credentials: "include",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify(newCourse),
                                        }
                                    )
                                        .then((res) => {
                                            router.reload();
                                            // props.setShowAddCourse(false);
                                        })
                                        .catch((err) => {
                                            console.log(
                                                "Error in saving new course"
                                            );
                                        });
                                }
                            }
                        }}
                    />
                </form>
            </div>
        </div>
    );
};

export default AddCourseModal;
