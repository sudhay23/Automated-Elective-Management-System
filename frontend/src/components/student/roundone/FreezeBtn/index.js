import styles from "./styles.module.css";
import { useState } from "react";
import freezeRoundOne from "../../../../utils/student/freezeRoundOne";
import RoundOneFreezeModal from "../RoundOneFreezeModal";

const FreezeBtn = (props) => {
    const [showFreezeConfirm, setShowFreezeConfirm] = useState(false);
    const { coursePrefs, studentObj } = props;
    return (
        <div className={styles.container}>
            {/* Freeze preferences modal */}
            {showFreezeConfirm ? (
                <RoundOneFreezeModal
                    setShowFreezeConfirm={setShowFreezeConfirm}
                    coursePrefs={coursePrefs}
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
