import {
  Button,
  Highlight,
  Image,
  LoadingOverlay,
  Overlay,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { gtInfoCollection, projectCollection, userProfileCollection } from 'imports/db/collections';
import { imageInfoCollection } from 'imports/db/collections';
import Images from 'imports/db/files';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SmallNavigation from 'ui/components/SmallNavigation/SmallNavigation';

import NavigationBar from '../../../../components/NavigationBar/NavigationBar';
import ProjectDetail from './ProjectDetail/ProjectDetail';
import styles from './ProjectList2.module.css';

export default function ProjectList2() {
  const user = useTracker(() => Meteor.user());
  const projectList = useTracker(() => projectCollection.find({}).fetch());
  const userList = useTracker(() => userProfileCollection.find({}).fetch());

  const [userRank, setUserRank] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [toggleCurrentProjectDetail, setToggleCurrentProjectDetail] = useState(false);
  const [IsThereAdmin, setIsThereAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projectInfoImage, setProjectInfoImage] = useState(false);

  const [percentage, setPercentage] = useState(0);

  const projectInfoPicture = (projectName) => {
    let prjectInfo = projectCollection.find({ projectName: projectName }).fetch();

    let imgLink = Images.findOne({ 'meta.projectName': projectName }).link();

    setProjectInfoImage(imgLink);
  };
  const getConfirmFileCount = (e) => {
    let prjectInfo = projectCollection.find({ projectName: e.projectName }).fetch();
    let imginfo = imageInfoCollection.find({ projectName: e.projectName }).fetch();
    let count;
    let confirmCount = 0;
    for (count = 0; count < imginfo.length; count++) {
      if (imginfo[count].confirmFlag === 'done') {
        confirmCount++;
      }
    }

    projectCollection.update(
      { _id: prjectInfo[0]._id },
      {
        $set: {
          totalUnConfirmSize: confirmCount,
        },
      }
    );

    setPercentage(
      parseInt(
        ((prjectInfo[0].totalFileSize - (prjectInfo[0].totalFileSize - confirmCount)) /
          prjectInfo[0].totalFileSize) *
          100
      )
    );
    setSelectedProject(e);

  };

  if (user && userList) {
    let userRanktmp;

    if (userList.length > 0) {
      userRanktmp = userList.filter((e) => e.userName == user.username);
      // console.log('logined user', userRanktmp[0].rank);
      if (userRank == '') setUserRank(userRanktmp[0].rank);
    }
  }

  // console.log(user, userList);
  return (
    <>
      {isLoading && (
        <div className="styles.overlay">
          <Overlay opacity={0.5} color="#000" zIndex={5} />
          <LoadingOverlay visible={isLoading} />
        </div>
      )}
      <main className={styles.main}>
        <div className={styles.container}>
          <SmallNavigation />

          <div className={styles.projectList}>
            <div className={styles.listHead}>
              <div className={styles.listHeadTitle}>순번</div>
              <div className={styles.listHeadTitle}>프로젝트 명</div>
              <div className={styles.listHeadTitle}>더보기</div>
            </div>
            <div className={styles.listContents}>
              <div className={styles.listContentsWrap}>
                {projectList && user
                  ? projectList
                      .filter((e) => e.workers == user.username || userRank == 'admin')
                      .map((e, idx) => (
                        <div key={e.projectId} className={styles.listContent}>
                          <div>{idx + 1}</div>
                          <div className={styles.projectName}>{e.projectName}</div>
                          <div className={styles.contentOptions}>
                            <Button
                              variant="link"
                              color="gray"
                              component={Link}
                              leftIcon={<i className="fas fa-sign-in-alt"></i>}
                              to={{
                                pathname: '/labelingPage',
                                search: `?projectName=${e.projectName}`,
                              }}
                              size="lg"
                            ></Button>
                            {userRank == 'admin' ? (
                              <Button
                                variant="link"
                                color="grape"
                                leftIcon={<i className="fas fa-info-circle"></i>}
                                size="lg"
                                onClick={() => {
                                  projectInfoPicture(e.projectName);
                                  getConfirmFileCount(e);

                                  setToggleCurrentProjectDetail(true);
                                }}
                              ></Button>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      ))
                  : ''}
              </div>
            </div>
          </div>
        </div>
        <NavigationBar />
        <ProjectDetail
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          toggleCurrentProjectDetail={toggleCurrentProjectDetail}
          setToggleCurrentProjectDetail={setToggleCurrentProjectDetail}
          setIsLoading={setIsLoading}
          projectInfoImage={projectInfoImage}
          setProjectInfoImage={setProjectInfoImage}
          percentage={percentage}
        />
      </main>
    </>
  );
}
