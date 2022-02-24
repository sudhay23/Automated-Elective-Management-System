import styles from "./styles.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { useState, useRef } from "react";

const AddCourseModal = (props) => {
    const [courseCode, setCourseCode] = useState("");
    const [courseName, setCourseName] = useState("");
    const [department, setDepartment] = useState("");
    const [addedBy, setAddedBy] = useState("");
    const [minCap, setMinCap] = useState("");
    const [maxCap, setMaxCap] = useState("");
    const [credits, setCredits] = useState("");
    const [preRequisites, setPreRequisites] = useState("");
    const formRef = useRef();

    return (
        <div className={styles.container}>
            <div className={styles.addCourseForm}>
                <div className={styles.formHeader}>
                    <FaArrowLeft
                        style={{ cursor: "pointer", fontSize: 28 }}
                        onClick={() => props.setShowAddCourse((x) => !x)}
                    />
                </div>
                <form action="#" className={styles.formContent} ref={formRef}>
                    <input
                        required
                        type="text"
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
                        value={courseName}
                        placeholder="Enter Course Name"
                        onChange={(e) => {
                            setCourseName(e.target.value);
                        }}
                    />
                    <input
                        required
                        type="text"
                        className={styles.inputField}
                        value={department}
                        placeholder="Enter Department"
                        onChange={(e) => {
                            setDepartment(e.target.value);
                        }}
                    />
                    <input
                        required
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
                        className={styles.inputField}
                        value={minCap}
                        placeholder="Enter Minimum Cap"
                        onChange={(e) => {
                            setMinCap(e.target.value);
                        }}
                    />
                    <input
                        required
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
                        className={styles.inputField}
                        value={credits}
                        placeholder="Enter Credits"
                        onChange={(e) => {
                            setCredits(e.target.value);
                        }}
                    />
                    <input
                        required
                        type="text"
                        className={styles.inputField}
                        value={preRequisites}
                        placeholder="Enter Prerequisite Course Codes (comma seperated)"
                        onChange={(e) => {
                            setPreRequisites(e.target.value);
                        }}
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className={styles.submitBtn}
                        onClick={(e) => {
                            // TODO: Add course on DB
                            e.preventDefault();
                            if (formRef.current.reportValidity()) {
                                const newCourse = {
                                    id: (
                                        parseInt(
                                            props.courses[
                                                props.courses.length - 1
                                            ].id
                                        ) + 1
                                    ).toString(),
                                    courseCode,
                                    courseName,
                                    department,
                                    addedBy,
                                    addedOn: new Date().toLocaleDateString(),
                                    minCap,
                                    maxCap,
                                    credits,
                                    preRequisites,
                                };
                                props.setCourses((courses) => [
                                    ...courses,
                                    newCourse,
                                ]);
                                props.setShowAddCourse(false);
                            }
                        }}
                    />
                </form>
            </div>
        </div>
    );
};

export default AddCourseModal;
