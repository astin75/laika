import React, {useState} from "react";
import {Accounts} from 'meteor/accounts-base';
import styles from "./SignUpPage.module.css";

export default function SignUpPage({
                                       setIsThereAccount,
                                   }) {
    const [userID, setUserID] = useState("");
    const [userPW, setUserPW] = useState("");
    const [userPWCHK, setUserPWCHK] = useState("");
    const signUpProcess = () => {
        const handleError = (err) => {
            if (err) {
                alert(err.message);
            } else {
                alert('good');
            }
        };

        let loginFlag = false;
        let passwordFlag = false;
        if (userID.length > 4) {
            loginFlag = true
        } else {
            alert('ID는 5자 이상으로 만들어 주세요..');
        }
        if (userPW.length > 4) {
            if (userPW !== userPWCHK) {
                alert('password 가 일치하지 않습니다..');
            } else {
                passwordFlag = true
            }
        } else {
            alert('password는 5자 이상으로 만들어 주세요..');
        }

        if (loginFlag && passwordFlag) {

            setIsThereAccount(true);
            Accounts.createUser(
                {
                    username:userID,
                    password:userPW,
                    profile:{
                        rank : "admin"
                    }
                },
                handleError)
        } else {
            props.mode('signUp')
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.title}>Sign up</div>
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
            <input
                placeholder="password"
                onChange={(e) => {
                    setUserPWCHK(e.target.value);
                }}
                className={styles.inputValue}
            ></input>
            <div
                className={styles.command}
                onClick={signUpProcess}
            >
                Sign Up
            </div>
        </div>
    );
}
