import React, { useEffect, useState } from "react";
import styles from "./AccountPage.module.css";

import { useTracker } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

import LoginPage from "./LoginPage/LoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";

export default function AccountPage() {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  const [isThereAccount, setIsThereAccount] = useState(true);


  return (
    <div className={styles.main}>
      {user ? (<button onClick={logout} className="btn btn-success">Sucess</button>):
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
