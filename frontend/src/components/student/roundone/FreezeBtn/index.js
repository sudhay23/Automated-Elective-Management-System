import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import RoundOneFreezeModal from "../RoundOneFreezeModal";

const FreezeBtn = (props) => {
    const [showFreezeConfirm, setShowFreezeConfirm] = useState(false);
    const { coursePrefs, studentObj } = props;
    // Hide or show scrollbar on modal shown
    useEffect(() => {
        if (showFreezeConfirm) {
            window.scroll({ top: 0 });
            // document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [showFreezeConfirm]);
    return (
        <div className={styles.container}>
            {/* Freeze preferences modal */}
            {showFreezeConfirm ? (
                <RoundOneFreezeModal
                    setShowFreezeConfirm={setShowFreezeConfirm}
                    coursePrefs={coursePrefs}
                    studentObj={studentObj}
                />
            ) : (
                <></>
            )}

            <button
                className={styles.freezeBtn}
                onClick={() => {
                    setShowFreezeConfirm((x) => !x);
                    // freezeRoundOne(coursePrefs, studentObj);
                }}
            >
                Freeze Choices for Round 1
            </button>
        </div>
    );
};

export default FreezeBtn;
