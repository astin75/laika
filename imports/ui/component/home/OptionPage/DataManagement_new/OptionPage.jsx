import React from "react";

import styles from "./OptionPage.module.css";

import ProjectListPage from "./ProjectListPage/ProjectListPage";
import ProjectEditPage from "./ProjectEditPage/ProjectEditPage";

export default function OptionPage() {
  return (
    <div className={styles.pageWrap}>
      <div className={styles.header}></div>
      <div className={styles.main}>
        <ProjectListPage />
        <ProjectEditPage />
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}
