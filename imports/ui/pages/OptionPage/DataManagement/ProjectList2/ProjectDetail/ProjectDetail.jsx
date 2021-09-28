import { Icon } from '@iconify/react';
import { Badge, Button, Image, MultiSelect, Progress } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import saveAs from 'file-saver';
import { projectCollection } from 'imports/db/collections';
import { userProfileCollection } from 'imports/db/collections';
import { imageInfoCollection } from 'imports/db/collections';
import { gtInfoCollection } from 'imports/db/collections';
import Images from 'imports/db/files';
import JSZip from 'jszip';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './ProjectDetail.module.css';

const useConfirm = (message = '', onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== 'function') {
    return;
  }
  if (onCancel && typeof onCancel !== 'function') {
    return;
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };
  return confirmAction;
};

export default function ProjectDetail({
  selectedProject,
  setSelectedProject,
  toggleCurrentProjectDetail,
  setToggleCurrentProjectDetail,
  setIsLoading,
  projectInfoImage,
  setProjectInfoImage,
  percentage,
}) {
  // console.log(selectedProject);
  const user = useTracker(() => Meteor.users.find({}).fetch());
  const [value, setValue] = useState([[], []]);
  const projectList = useTracker(() => projectCollection.find({}).fetch());
  const userList = useTracker(() => userProfileCollection.find({}).fetch());

  const [projectProgres, setProjectProgress] = useState(0);

  const userData = [];
  const [selectedUsers, setSelectedUsers] = useState([]);

  if (userList) {
    userList.map((e) => {
      userData.push(e.userName);
    });
  }

  useEffect(() => {
    if (projectProgres !== percentage) setProjectProgress(percentage);
  }, [percentage]);

  const updateProjectDetail = () => {
    if (value[0] === null || value[1] === null) {
      alert('프로젝트 일정이 선택되지 않았습니다');
      return;
    } else if (value[0].length === 0 || value[1].length === 0) {
      alert('프로젝트 일정이 선택되지 않았습니다');
      return;
    } else if (selectedUsers.length === 0) {
      alert('작업자를 지정하지 않았습니다');
      return;
    }

    projectCollection.update(
      { _id: selectedProject._id },
      {
        $set: {
          startDate: `${value[0].getFullYear()}-${value[0].getMonth()}-${value[0].getDate()}`,
          endDate: `${value[1].getFullYear()}-${value[1].getMonth()}-${value[1].getDate()}`,
          workers: selectedUsers,
        },
      }
    );
    setSelectedProject(null);
    setToggleCurrentProjectDetail(false);
  };

  const multiDownloadFile = (rawImgs, gt) => {
    let zip = new JSZip();
    let zipFilename = 'output.zip';

    // GT DB를 array -> json 으로 변경 후 -> blob 으로 변경뒤 zip.file로 push
    // 이미지 DB 리스트 link -> blob 으로 변경뒤 zip.file로 push
    if (gt.length > 1) {
      gt.forEach(function (gtValue, i) {
        let filename = i + '.json';
        let filename1 = i + '.jpg';
        let blob = new Blob([JSON.stringify(gtValue, null, 4)], { type: 'text/json' });

        let webUrl = String(Images.findOne(rawImgs[i]._id).link());
        let imgBlob = fetch(webUrl).then((res) => res.blob());
        zip.file(filename1, imgBlob, { binary: true });
        zip.file(filename, blob, { binary: true });
      });
    } else {
      let filename = 0 + '.json';
      let filename1 = 0 + '.jpg';
      let blob = new Blob([JSON.stringify(gt, null, 4)], { type: 'text/json' });

      let webUrl = String(Images.findOne(rawImgs[0]._id).link());
      let imgBlob = fetch(webUrl).then((res) => res.blob());
      zip.file(filename1, imgBlob, { binary: true });
      zip.file(filename, blob, { binary: true });
    }

    // 최종 zip 으로 out~
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, zipFilename);
      setIsLoading(false);
    });
  };

  const onDownload = (e) => {
    let gtinfo = gtInfoCollection.find({ projectName: selectedProject.projectName }).fetch();
    let imgRaw = Images.find({ 'meta.projectName': selectedProject.projectName }).fetch();

    e.preventDefault();
    multiDownloadFile(imgRaw, gtinfo);
  };

  const deleteProject = () => {
    let gtinfo = gtInfoCollection.find({ projectName: selectedProject.projectName }).fetch();
    let imginfo = imageInfoCollection.find({ projectName: selectedProject.projectName }).fetch();
    let rawImg = Images.find({ 'meta.projectName': selectedProject.projectName }).fetch();
    let prjectInfo = projectCollection.find({ projectName: selectedProject.projectName }).fetch();
    let count = 0;

    for (count = 0; count < gtinfo.length; count++) {
      gtInfoCollection.remove(gtinfo[count]._id);
      imageInfoCollection.remove(imginfo[count]._id);
      Images.remove({ _id: rawImg[count]._id });
    }

    projectCollection.remove(prjectInfo[0]._id);
    setSelectedProject(null);
    setToggleCurrentProjectDetail(false);
    setProjectInfoImage(false);
  };
  const abort = () => {
    return;
  };
  const confirmDelete = useConfirm('프로젝트를 삭제하시겠습니까? ', deleteProject, abort);

  return (
    <div
      style={{
        opacity: toggleCurrentProjectDetail ? 1 : 0,
        width: toggleCurrentProjectDetail ? '20%' : '0',
        transition: toggleCurrentProjectDetail
          ? 'opacity 1300ms, width 300ms'
          : 'opacity 300ms, width 300ms',
      }}
      className={styles.container}
    >
      <div className={styles.top}>
        <Image className={styles.detailImg} src={projectInfoImage} />
      </div>
      {selectedProject ? (
        <div className={styles.bottom}>
          <div className={styles.selectedObjects}>
            {selectedProject.objectId === true ? (
              <Badge variant="filled" color="red" size="sm">
                ID
              </Badge>
            ) : (
              ''
            )}
            {selectedProject.stateList.length > 0 ? (
              <Badge variant="filled" color="pink" size="sm">
                action
              </Badge>
            ) : (
              ''
            )}
            {selectedProject.polygon === true ? (
              <Badge variant="filled" color="indigo" size="sm">
                polygon
              </Badge>
            ) : (
              ''
            )}
            {selectedProject.keypoint.length > 0 ? (
              <Badge variant="filled" size="sm">
                keyPoint
              </Badge>
            ) : (
              ''
            )}
            {selectedProject.bbox.length > 0 ? (
              <Badge variant="filled" color="teal" size="sm">
                bBox
              </Badge>
            ) : (
              ''
            )}
          </div>
          <div className={styles.projectDetails}>
            <div className={styles.detailTitle}>프로젝트명</div>
            <div>
              {selectedProject.projectName}
              {selectedProject.masterProjectName.length > 0 ? (
                <>/ 마스터프로젝트 : {selectedProject.masterProjectName}</>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={styles.projectDetails}>
            <div className={styles.detailTitle}>프로젝트 기간 </div>
            <DateRangePicker
              placeholder={
                selectedProject.startDate
                  ? `${selectedProject.startDate} - ${selectedProject.endDate}`
                  : 'Pick dates range'
              }
              value={value}
              onChange={setValue}
            />
          </div>
          <div className={styles.projectDetails}>
            <div className={styles.detailTitle}>프로젝트 라벨러 </div>
            {user ? (
              <MultiSelect
                data={userData}
                placeholder={selectedProject.workers.map((e) => ` ${e}`)}
                onChange={(e) => setSelectedUsers(e)}
              />
            ) : (
              ''
            )}
          </div>

          <div className={styles.projectDetails}>
            <div className={styles.detailTitle}>
              진행 상황 &nbsp;
              {projectProgres}% ( {selectedProject.totalUnConfirmSize} /{' '}
              {selectedProject.totalFileSize})
            </div>
            <Progress value={projectProgres} />
          </div>

          <div className={styles.projectOptions}>
            <Button
              variant="link"
              leftIcon={<Icon icon="mdi:tray-arrow-down" />}
              style={{ width: '30px', height: '30px' }}
              size="lg"
              onClick={(event) => {
                setIsLoading(true);
                onDownload(event);
              }}
            ></Button>
            <Button
              variant="link"
              color="grape"
              leftIcon={<i className="fas fa-save"></i>}
              size="lg"
              onClick={updateProjectDetail}
            ></Button>
            <Button
              variant="link"
              component={Link}
              to={{
                pathname: '/labelingPage',
                search: `?projectName=${selectedProject.projectName}`,
              }}
              color="teal"
              leftIcon={<i className="fas fa-sign-in-alt"></i>}
              size="lg"
            ></Button>
            <Button
              variant="link"
              color="red"
              leftIcon={<i className="fas fa-trash"></i>}
              size="lg"
              onClick={confirmDelete}
            ></Button>
          </div>
        </div>
      ) : (
        ''
      )}

      <div
        className={styles.exitBtn}
        onClick={() => {
          setSelectedProject(null);
          setToggleCurrentProjectDetail(false);
          setProjectInfoImage(false);
        }}
      >
        <div className={styles.exitBtnLeftBar}></div>
        <div className={styles.exitBtnRightBar}></div>
      </div>
    </div>
  );
}
