import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import RoundOneFreezeModal from "../RoundOneFreezeModal";

const FreezeBtn = (props) => {
  const [showFreezeConfirm, setShowFreezeConfirm] = useState(false);
  const { coursePrefs, studentObj } = props;
  const [roundOneActive, setRoundOneActive] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/systemstatus`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRoundOneActive(data.roundOneActive);
      });
  }, []);
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
        disabled={!roundOneActive}
        onClick={() => {
          setShowFreezeConfirm((x) => !x);
        }}
      >
        {roundOneActive
          ? "Freeze Choices for Round 1"
          : "Round 1 is not active"}
      </button>
    </div>
  );
};

export default FreezeBtn;
