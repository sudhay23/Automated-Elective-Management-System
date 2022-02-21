import styles from "./styles.module.css";
import { FaArrowLeft } from "react-icons/fa";

const AddCourseModal = (props) => {
	return (
		<div className={styles.container}>
			<div className={styles.addCourseForm}>
				<form action="#" method="POST">
					<FaArrowLeft
						style={{ cursor: "pointer", fontSize: 28 }}
						onClick={() => props.setShowAddCourse((x) => !x)}
					/>
				</form>
			</div>
		</div>
	);
};

export default AddCourseModal;
