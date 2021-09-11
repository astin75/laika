import React, { useState } from "react";
import styles from "./SignUpPage.module.css";

export default function SignUpPage({
  setSignUpId,
  setSignUpPW,
  setIsThereAccount,
}) {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

  const setID = (e) => {
    setUserID(e);
  };
  const setPW = (e) => {
    setUserPW(e);
  };

  const signUpProcess = (ID, PW) => {
    setSignUpId(ID);
    setSignUpPW(PW);
    setIsThereAccount(true);
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>Sign up</div>
      <input
        placeholder="Email Address"
        onChange={(e) => {
          setID(e.target.value);
        }}
        className={styles.inputValue}
      ></input>
      <input
        placeholder="password"
        onChange={(e) => {
          setPW(e.target.value);
        }}
        className={styles.inputValue}
      ></input>
      <div
        className={styles.command}
        onClick={() => {
          signUpProcess(userID, userPW);
        }}
      >
        Sign Up
      </div>
    </div>
  );
}
