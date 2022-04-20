import styles from "./styles.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// TODO - This component from Figma
const RoundOneFreezeModal = (props) => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.addCourseForm}>
                <div className={styles.formHeader}>
                    <FaArrowLeft
                        style={{ cursor: "pointer", fontSize: 28 }}
                        onClick={() => {
                            props.setShowFreezeConfirm((x) => !x);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default RoundOneFreezeModal;
