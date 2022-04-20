import styles from "./styles.module.css";
import { FaArrowLeft } from "react-icons/fa";
import freezeRoundOne from "../../../../utils/student/freezeRoundOne";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const RoundOneFreezeModal = (props) => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.confirmationArea}>
                <div className={styles.formHeader}>
                    <FaArrowLeft
                        style={{ cursor: "pointer", fontSize: 28 }}
                        onClick={() => {
                            props.setShowFreezeConfirm((x) => !x);
                        }}
                    />
                    <p className={styles.notice}>
                        I agree the following preference order to be saved for
                        my <strong>Round 1</strong> participation and affirm
                        that this order cannot be modified{" "}
                    </p>
                </div>
                <div className={styles.preferences}>
                    <ul className={styles.preferencesList}>
                        {props.coursePrefs.map((coursePref, idx) => (
                            <li key={idx} className={styles.preferencesItem}>
                                {idx + 1}. {coursePref.courseName} (Credits:{" "}
                                {coursePref.credits}; Min.CGPA:{" "}
                                {coursePref.minCGPA})
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    className={styles.freezeBtn}
                    onClick={async () => {
                        const freezeStatus = await freezeRoundOne(
                            props.coursePrefs,
                            props.studentObj
                        );
                        if (freezeStatus) {
                            router.reload();
                        } else {
                            router.replace("/student/dashboard");
                        }
                    }}
                >
                    Freeze
                </button>
            </div>
        </div>
    );
};

export default RoundOneFreezeModal;
