import React, { useEffect, useState } from "react";
import styles from "./AccountPage.module.css";

import LoginPage from "./LoginPage/LoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";

export default function AccountPage() {
  const [isThereAccount, setIsThereAccount] = useState(true);
  const [loginID, setLoginID] = useState("");
  const [loginPW, setLoginPW] = useState("");
  const [signUpID, setSignUpId] = useState("");
  const [signUpPW, setSignUpPW] = useState("");

  useEffect(() => {
    console.log(loginID, loginPW);

    // 로그인 성공 여부에 따라 Project Page로 Redirect !
  }, [loginID, loginPW]); //  login시 확인 로직

  useEffect(() => {
    console.log(signUpID, signUpPW);

    // 회원가입 성공 여부에 따라 LoginPage로 전달 !
    // ex)
    // if(true){
    //     //
    // }
    // else{
    //     alert("이미 아이디가 존재합니다");
    // }
  }, [signUpID, signUpPW]); //signUp시 확인 로직

  return (
    <div className={styles.main}>
      {isThereAccount ? (
        <LoginPage
          setLoginID={setLoginID}
          setLoginPW={setLoginPW}
          setIsThereAccount={setIsThereAccount}
        />
      ) : (
        <SignUpPage
          setSignUpId={setSignUpId}
          setSignUpPW={setSignUpPW}
          setIsThereAccount={setIsThereAccount}
        />
      )}
    </div>
  );
}
