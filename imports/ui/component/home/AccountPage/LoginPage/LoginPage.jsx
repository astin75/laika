import React, { useEffect, useState } from "react";
import { Meteor } from 'meteor/meteor';
import styles from "./LoginPage.module.css";

export default function LoginPage({
  setIsThereAccount,
}) {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

  const loginProcess = () => {
      const handleError = (err) => {
          if (err) {
              alert(err.message);
          }
          else{
              setIsThereAccount(true)
          }
      };
      Meteor.loginWithPassword(userID, userPW, handleError);
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>Login</div>
      <input
        placeholder="Email Address"
        onChange={(e) => {
            setUserID(e.target.value);
        }}
        className={styles.inputValue}
      ></input>
      <input
        placeholder="password"
        onChange={(e) => {
            setUserPW(e.target.value);
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
          onClick={loginProcess}
        >
          Login
        </div>
      </div>
    </div>
  );
}
