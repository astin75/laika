import React, { useEffect, useState } from "react";
import styles from "./AccountPage.module.css";

import { useTracker } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

import LoginPage from "./LoginPage/LoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";

import { Button } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import {Link} from "react-router-dom";


export default function AccountPage() {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  const [isThereAccount, setIsThereAccount] = useState(true);

  const notifications = useNotifications();
  const showNotification = () => notifications.showNotification({
    title: '',
    message: '안녕하세요.! 라이카에 오신걸 환영합니다.! 🤥',
  });

  useEffect(() =>{
    showNotification()

  }, [])



  return (
    <div className={styles.main}>
      {user ? (<div>
            <button onClick={logout} className="btn btn-success">Sucess</button>
            <Link  to="/optionPage" className="btn btn-success">optionPage</Link >
          </div>):
          (<div>
            {isThereAccount ? (
                <LoginPage setIsThereAccount={setIsThereAccount}/>
            ) : (
                <SignUpPage  setIsThereAccount={setIsThereAccount}/>
            )}
          </div>)}

    </div>
  );
}
