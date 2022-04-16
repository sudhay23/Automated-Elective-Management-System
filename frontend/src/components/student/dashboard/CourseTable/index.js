import styles from "./styles.module.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import FreezeBtn from "../FreezeBtn";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CourseTable = (props) => {
    const [eligibleCourses, setEligibleCourses] = useState([]);
    const [ineligibleCourses, setIneligibleCourses] = useState([]);
    useEffect(() => {
        setEligibleCourses(
            props.courses.filter((course) => {
                return course.minCGPA <= props.user.cgpa;
            })
        );
        setIneligibleCourses(
            props.courses.filter((course) => {
                return course.minCGPA > props.user.cgpa;
            })
        );
    }, []);

    const pushCourseUp = (currIdx) => {
        if (currIdx != 0) {
            let newPrefs = Array.from(eligibleCourses);
            let temp = newPrefs[currIdx];
            newPrefs[currIdx] = newPrefs[currIdx - 1];
            newPrefs[currIdx - 1] = temp;
            setEligibleCourses(newPrefs);
        }
    };
    const pushCourseDown = (currIdx) => {
        if (currIdx < eligibleCourses.length - 1) {
            let newPrefs = Array.from(eligibleCourses);
            let temp = newPrefs[currIdx];
            newPrefs[currIdx] = newPrefs[currIdx + 1];
            newPrefs[currIdx + 1] = temp;
            setEligibleCourses(newPrefs);
        }
    };
    const router = useRouter();

    return (
        <div className={styles.container}>
            <table cellSpacing={0}>
                <thead>
                    <tr>
                        <th className={styles.snoCell}>S.no</th>
                        <th className={styles.courseCodeCell}>Course Code</th>
                        <th className={styles.courseNameCell}>Course Name</th>
                        <th className={styles.departmentCell}>Department</th>
                        <th className={styles.addedByCell}>Added By</th>
                        <th className={styles.addedOnCell}>Added On</th>
                        <th className={styles.minCapCell}>Min.Cap</th>
                        <th className={styles.maxCapCell}>Max.Cap</th>
                        <th className={styles.reorderCell}>Reorder</th>
                    </tr>
                </thead>
                <tbody>
                    {eligibleCourses.map((course, idx) => (
                        <tr
                            key={idx}
                            data-id={course._id}
                            title={`Pre-requisites are ${course.preRequisites}`}
                        >
                            <td className={styles.snoCellData}>{idx + 1}</td>
                            <td className={styles.courseCodeCellData}>
                                {course.courseCode}
                            </td>
                            <td className={styles.courseNameCellData}>
                                {course.courseName}
                                <br /> (Credits: {course.credits} - Min CGPA:{" "}
                                {course.minCGPA})
                            </td>
                            <td className={styles.departmentCellData}>
                                {course.department}
                            </td>
                            <td className={styles.addedByCellData}>
                                {course.addedBy}
                            </td>
                            <td className={styles.addedOnCellData}>
                                {new Date(course.addedOn).toLocaleDateString()}
                            </td>
                            <td className={styles.minCapCellData}>
                                {course.minCap}
                            </td>
                            <td className={styles.maxCapCellData}>
                                {course.maxCap}
                            </td>
                            <td className={styles.reorderCellData}>
                                {idx != 0 ? (
                                    <FaChevronUp
                                        style={{
                                            marginRight: 10,
                                            fontSize: "26px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => pushCourseUp(idx)}
                                    />
                                ) : (
                                    <></>
                                )}
                                {idx != eligibleCourses.length - 1 ? (
                                    <FaChevronDown
                                        style={{
                                            marginLeft: 10,
                                            fontSize: "26px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => pushCourseDown(idx)}
                                    />
                                ) : (
                                    <></>
                                )}
                            </td>
                        </tr>
                    ))}
                    {/* Show inEligible courses in different color scheme */}
                    {ineligibleCourses.map((course, idx) => (
                        <tr
                            key={idx}
                            data-id={course._id}
                            className={styles.ineligibleCourseRow}
                            title={`Pre-requisites are ${course.preRequisites} | Minimum CGPA not attained`}
                        >
                            <td className={styles.snoCellData}>-</td>
                            <td className={styles.courseCodeCellData}>
                                {course.courseCode}
                            </td>
                            <td className={styles.courseNameCellData}>
                                {course.courseName}
                                <br /> (Credits: {course.credits} - Min CGPA:{" "}
                                {course.minCGPA})
                            </td>
                            <td className={styles.departmentCellData}>
                                {course.department}
                            </td>
                            <td className={styles.addedByCellData}>
                                {course.addedBy}
                            </td>
                            <td className={styles.addedOnCellData}>
                                {new Date(course.addedOn).toLocaleDateString()}
                            </td>
                            <td className={styles.minCapCellData}>
                                {course.minCap}
                            </td>
                            <td className={styles.maxCapCellData}>
                                {course.maxCap}
                            </td>
                            <td className={styles.reorderCellData}>-</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <FreezeBtn />
        </div>
    );
};

export default CourseTable;
