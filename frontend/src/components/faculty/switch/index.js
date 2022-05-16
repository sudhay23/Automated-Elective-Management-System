import React from "react";
import styles from "./styles.module.css";

const Switch = ({ isOn, handleToggle, onColor }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={styles.reactswitchcheckbox}
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && onColor }}
        className={styles.reactswitchlabel}
        htmlFor={`react-switch-new`}
      >
        <span className={styles.reactswitchbutton} />
      </label>
    </>
  );
};

export default Switch;
