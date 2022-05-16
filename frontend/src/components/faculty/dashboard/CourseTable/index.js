import styles from "./styles.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";

const CourseTable = (props) => {
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
						<th className={styles.filledSlotsCell}>Filled Slots</th>
						<th className={styles.addedOnCell}>Added On</th>
						<th className={styles.minCapCell}>Min.Cap</th>
						<th className={styles.maxCapCell}>Max.Cap</th>
						<th className={styles.actionsCell}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{props.courses.map((course, idx) => (
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
							<td className={styles.filledSlotsCellData}>
								{course.filledSlots}
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
							<td className={styles.actionsCellData}>
								<FaEdit
									style={{
										marginRight: 10,
										fontSize: "20px",
										cursor: "pointer",
									}}
									onClick={() => {
										props.setUpdateCourse(course);
										props.setShowAddCourse(true);
									}}
								/>
								<FaTrash
									style={{
										marginLeft: 10,
										fontSize: "20px",
										cursor: "pointer",
									}}
									onClick={() => {
										props.setCourses((x) =>
											x.filter((y) => y._id != course._id)
										);
										fetch(
											`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faculty/course/${course._id}`,
											{
												method: "DELETE",
												credentials: "include",
											}
										)
											.then((res) => {
												router.reload();
											})
											.catch((err) => {
												console.log(
													"Error in deleting the course"
												);
											});
									}}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CourseTable;
