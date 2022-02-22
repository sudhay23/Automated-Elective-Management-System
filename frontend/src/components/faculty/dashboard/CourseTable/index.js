import styles from "./styles.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

const CourseTable = (props) => {
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
						<th className={styles.actionsCell}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{props.courses.map((course, idx) => (
						<tr key={idx}>
							<td className={styles.snoCellData}>{idx + 1}</td>
							<td className={styles.courseCodeCellData}>
								{course.courseCode}
							</td>
							<td className={styles.courseNameCellData}>
								{course.courseName}
								<br /> (Credits: {course.credits})
							</td>
							<td className={styles.departmentCellData}>
								{course.department}
							</td>
							<td className={styles.addedByCellData}>
								{course.addedBy}
							</td>
							<td className={styles.addedOnCellData}>
								{course.addedOn}
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
								/>
								<FaTrash
									style={{
										marginLeft: 10,
										fontSize: "20px",
										cursor: "pointer",
									}}
									onClick={() => {
										//TODO: Should trigger a DELETE request for DB too
										props.setCourses((x) =>
											x.filter((y) => y.id != course.id)
										);
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
