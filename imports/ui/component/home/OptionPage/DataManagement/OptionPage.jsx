import React, { useEffect, useState } from "react";
import styles from "./OptionPage.module.css";
import { useTracker } from "meteor/react-meteor-data";
import ProjectList2 from "./projectList2/ProjectList2";
import ProjectUpload from "./projectUpload/ProjectUpload";
import { projectCollection } from "../../../../../db/collections";


export const OptionPage = () => {
  const user = useTracker(() => Meteor.user());
  const [IsThereAdmin, setIsThereAdmin] = useState(false);

  useEffect(() => {
    if (user !== undefined) {
      if (user.profile["rank"] === "admin") {
        setIsThereAdmin(true);
      }
    }
  }, [user]);

  return (
    <main className={styles.main}>
      <div className={styles.header}>헤더</div>
      <div className={styles.body}>
        <div className={styles.left}>
          <ProjectList2/>
          <></>

        </div>
        <div className={styles.right}>
          {IsThereAdmin ? (
            <ProjectUpload />
          ) : (
            <a>
              <img src={"lockDataManagement.png"} />
            </a>
          )}
        </div>
      </div>
      <div className={styles.footer}>푸터</div>
    </main>
  );
};
