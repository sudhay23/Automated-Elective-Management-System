import styles from "./styles.module.css";

const CourseTable = (props) => {
	return (
		<div className={styles.container}>
			<table cellSpacing={0}>
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
			</table>
		</div>
	);
};

export default CourseTable;
