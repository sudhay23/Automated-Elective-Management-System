import styles from "./styles.module.css";

const ControlBar = (props) => {
	return (
		<div className={styles.container}>
			<button
				className={styles.newCourseBtn}
				onClick={() => props.setShowAddCourse((x) => !x)}
			>
				Add New Course
			</button>
			<div>
				<div className={styles.welcomeMsg}>
					Hello,{" "}
					<strong>{`${props.user?.firstName} ${props.user?.lastName}`}</strong>
				</div>
				<button className={styles.logoutBtn}>Logout</button>
			</div>
		</div>
	);
};

export default ControlBar;
