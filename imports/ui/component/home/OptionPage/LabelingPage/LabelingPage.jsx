import React, { useEffect, useState } from "react";

import ImageFilesPage from "./ImageFilesPage/ImageFilesPage";
import CanvasPage from "./CanvasPage/CanvasPage";
import ObjectPage from "./ObjectPage/ObjectPage";
import HeaderPage from "./HeaderPage/HeaderPage";

import styles from "./LabelingPage.module.css";

import queryString from "query-string";
import { useTracker } from "meteor/react-meteor-data";
import { imageInfoCollection } from "../../../../../db/collections";
import { gtInfoCollection } from "../../../../../db/collections";

import { projectCollection } from "../../../../../db/collections";

export default function LabelingPage() {
  const query = queryString.parse(location.search);
  const projectList = useTracker(() => projectCollection.find({}).fetch());
  const imageList = useTracker(() => imageInfoCollection.find({}).fetch());
  const gtinfor = useTracker(() => imageInfoCollection.find({}).fetch());
  const [currentProjectInfo, setCurrentProjectInfo] = useState(null);

  console.log(imageList);
  console.log("gt", gtinfor);

  useEffect(() => {
    if (projectList.length !== 0) {
      let currentProjectInfortmp;
      currentProjectInfortmp = projectList.find(
        (e) => e.projectName === query.projectName
      );
      if (currentProjectInfo === null)
        setCurrentProjectInfo(currentProjectInfortmp);
    }
  }, [projectList]);

  return (
    <div className={styles.main}>
      <HeaderPage />
      <div className={styles.contents}>
        <ImageFilesPage currentProjectInfo={currentProjectInfo} />
        <CanvasPage />
        <ObjectPage />
      </div>
    </div>
  );
}
