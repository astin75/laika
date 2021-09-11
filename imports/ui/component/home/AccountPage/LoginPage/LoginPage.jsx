import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";

export default function LoginPage({
  setLoginID,
  setLoginPW,
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

  const loginProcess = (ID, PW) => {
    setLoginID(ID);
    setLoginPW(PW);
  };

  //   useEffect(() => {
  //     console.log(userID, userPW);
  //   }, [userID, userPW]);

  return (
    <div className={styles.main}>
      <div className={styles.title}>Login</div>
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
      <div className={styles.command}>
        <div
          onClick={() => {
            setIsThereAccount(false);
          }}
        >
          Sign Up
        </div>
        <div
          onClick={() => {
            loginProcess(userID, userPW);
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
}
