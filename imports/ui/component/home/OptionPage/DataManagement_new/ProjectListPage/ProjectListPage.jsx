import React from "react";

import styles from "./ProjectListPage.module.css";
import ProjectList from "./ProjectList/ProjectList";

export default function ProjectListPage() {
  const projectList = [
    ["Project1", "False", "False", "False", "False", "False", "", ""],
    ["Project2", "False", "False", "False", "False", "False", "", ""],
    ["Project3", "False", "False", "False", "False", "False", "", ""],
    ["Project4", "False", "False", "False", "False", "False", "", ""],
    ["Project4", "False", "False", "False", "False", "False", "", ""],
    ["Project4", "False", "False", "False", "False", "False", "", ""],
    ["Project4", "False", "False", "False", "False", "False", "", ""],
    ["Project4", "False", "False", "False", "False", "False", "", ""],
    ["Project4", "False", "False", "False", "False", "False", "", ""],
    ["Project4", "False", "False", "False", "False", "False", "", ""],
    ["Project4", "False", "False", "False", "False", "False", "", ""],
    ["Project4", "False", "False", "False", "False", "False", "", ""],
  ];

  return (
    <div className={styles.pageWrap}>
      <div className={styles.listTitle}>
        <div>Name</div>
        <div>Bounding Box</div>
        <div>Key Point</div>
        <div>Polygon</div>
        <div>ObjectID</div>
        <div>Annotation</div>
        <div>State1</div>
        <div>State2</div>
      </div>
      <div className={styles.projectList}>
        {projectList.map((project) => (
          <ProjectList key={project[0]} project={project} />
        ))}
      </div>
    </div>
  );
}
