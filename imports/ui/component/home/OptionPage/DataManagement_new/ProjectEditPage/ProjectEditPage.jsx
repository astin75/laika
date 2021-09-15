import React from "react";

import styles from "./ProjectEditPage.module.css";
import ProjectDetailPage from "./ProjectDetailPage/ProjectDetailPage";

export default function ProjectEditPage() {
  return (
    <div className={styles.pageWrap}>
      <ProjectDetailPage />
      <div className={styles.generateProjectBtn}>Register Project</div>
      <div className={styles.generateStateValue}></div>
    </div>
  );
}
