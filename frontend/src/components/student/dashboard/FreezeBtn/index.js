import styles from "./styles.module.css";

const FreezeBtn = (props) => {
	return (
		<div className={styles.container}>
			<button className={styles.freezeBtn}>
				Freeze Choices for Round 1
			</button>
		</div>
	);
};

export default FreezeBtn;
