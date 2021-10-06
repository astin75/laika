import { Button, Col, Grid, Overlay, Progress, Switch } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { imageInfoCollection, userProfileCollection } from "imports/db/collections";
import { gtInfoCollection } from 'imports/db/collections';
import { projectCollection } from 'imports/db/collections';
import Images from 'imports/db/files';
import { chunk } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SmallNavigation from 'ui/components/SmallNavigation/SmallNavigation';

import NavigationBar from '../../../../components/NavigationBar/NavigationBar';
import AddImages from './AddImages/AddImages';
import AddState from './AddState/AddState';
import BoundingBoxConfig from './BoundingBoxConfig/BoundingBoxConfig';
import KeypointConfig from './KeypointConfig/KeypointConfig';
import ProjectTitle from './ProjectTitle/ProjectTitle';
// @ts-ignore
import styles from './ProjectUpload.module.css';
import { useTracker } from "meteor/react-meteor-data";

const CHUNK_SIZE = 500;

export default function ProjectUpload() {
  const [projectName, setProjectName] = useState([{ masterProjectName: true, projectName: '' }]);
  const [isMaster, setIsMaster] = useState(false);
  const [tempMasterName, setTempMasterName] = useState('');
  const [boxClassList, setBoxClassList] = useState([]);
  const [keyPointClassList, setKeyPointClassList] = useState([]);
  const [objectStateBox, setObjectStateBox] = useState([]);

  const [ImgFileInfo, setImgFileInfo] = useState({ imgInfo: [] });
  const [RawImgList, setRawImgList] = useState({ rawFile: [] });
  const [GroundTruthJson, setGroundTruthJson] = useState({ List: [] });
  const [fileCount, setFileCount] = useState(0);
  const [jsonFileCount, setJsonFileCount] = useState(0);
  const [WithGroundTruthFlag, setWithGroundTruthFlag] = useState(false);

  const [checkedPolygon, setCheckedPolygon] = useState(false);
  const [checkedObjectIdFlag, setCheckedObjectIdFlag] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [globalError, setGlobalError] = useState(true);

  const [uploadIdx, setUploadIdx] = useState(0);
  const [startUpload, setStartUpload] = useState(false);

  const notifications = useNotifications();
  const showNotification = (color, msg, autoClose) =>
    notifications.showNotification({
      title: msg,
      message: 'never close unless you click',
      color: color,
      autoClose: autoClose,
    });

  const switchStyles = {
    label: { fontSize: 13 },
  };

  const insertImage = (file, projectName, fileId) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        const upload = Images.insert(
          {
            file,
            chunkSize: 'dynamic',
            meta: { projectName: projectName, fileId: fileId },
          },
          false
        );

        upload.start();
        resolve();
      }, 0)
    );
  };

  const uploadImage = (file, projectName, fileId) => {
    const upload = Images.insert(
      {
        file,
        chunkSize: 'dynamic',
        meta: { projectName: projectName, fileId: fileId },
      },
      false
    );
    upload.on('end', function (err, obj) {
      if (err) {
        alert('Upload Error', err);
      } else {
        if (uploadIdx < RawImgList.rawFile.length - 1) {
          setUploadIdx((prev) => prev + 1);
          const percentage = (uploadIdx / fileCount) * 100;
          setProgress(percentage);
        } else {
          setProjectName([{ masterProjectName: true, projectName: '' }]);
          setGlobalError(true);
          setStartUpload(false);
          showNotification('blue', '프로젝트가 등록 되었습니다.! 🤥', false);
          setIsLoading(false);
        }
      }
    });
    upload.start();
  };

  const onRegister2 = () => {
    let RandValue = new Uint32Array(1);
    if (fileCount < 1) {
      showNotification('red', '이미지를 등록해주세요.! 🤥', true);
      return;
    }
    if (jsonFileCount < 1) {
      showNotification('red', 'JSON을 등록해주세요.! 🤥', true);
      return;
    }

    window.crypto.getRandomValues(RandValue);
    setProgress(0);

    let tempImgFileInfo = [...ImgFileInfo.imgInfo];
    let tempGroundTruthJson = [...GroundTruthJson.List];
    let imageIndex = 0;

    for (; imageIndex < fileCount; imageIndex++) {
      // percentage = (imageIndex / fileCount) * 100;
      tempGroundTruthJson[imageIndex].projectID = RandValue[0];
      tempGroundTruthJson[imageIndex].projectName = projectName[0].projectName;
      tempGroundTruthJson[imageIndex].masterProjectName = projectName[0].masterProjectName;
      tempGroundTruthJson[imageIndex].ImgFileId = tempImgFileInfo[imageIndex].fileId;
      tempGroundTruthJson[imageIndex].ImgFileName = tempImgFileInfo[imageIndex].fileName;

      // console.log(
      //   tempGroundTruthJson[imageIndex].ImgFileName,
      //   tempImgFileInfo[imageIndex].fileName
      // );
      // console.log(tempGroundTruthJson[imageIndex].ImgFileId, tempImgFileInfo[imageIndex].fileId);

      tempImgFileInfo[imageIndex].projectID = RandValue[0];
      tempImgFileInfo[imageIndex].projectName = projectName[0].projectName;
      tempImgFileInfo[imageIndex].masterProjectName = projectName[0].masterProjectName;
      imageInfoCollection.insert(tempImgFileInfo[imageIndex]);
      gtInfoCollection.insert(tempGroundTruthJson[imageIndex]);
    }
    let colorHex = [
      '#12b886',
      '#fa5252',
      '#fd7e14',
      '#fab005',
      '#7950f2',
      '#e64980',
      '#be4bdb',
      '#4c6ef5',
      '#228be6',
      '#15aabf',
      '#40c057',
      '#82c91e',
    ];

    let polyFlag = false;
    if (boxClassList.length > 0) {
      polyFlag = true;
    }

    if(isMaster){
      let tempProjectInfo = {
        projectName: projectName[0].projectName,
        masterProjectName: tempMasterName.projectName,
        startDate: '',
        endDate: '',
        workers: [],
        projectId: RandValue[0],
        bbox: tempMasterName.bbox,
        keypoint: tempMasterName.keypoint,
        stateList: tempMasterName.stateList,
        polygon: tempMasterName.polygon,
        objectId: tempMasterName.objectId,
        color: tempMasterName.color,
        totalFileSize: fileCount,
        totalUnConfirmSize: 0,
      };
      projectCollection.insert(tempProjectInfo);
    }
    else{
      let tempProjectInfo = {
        projectName: projectName[0].projectName,
        masterProjectName: projectName[0].masterProjectName,
        startDate: '',
        endDate: '',
        workers: [],
        projectId: RandValue[0],
        bbox: boxClassList,
        keypoint: keyPointClassList,
        stateList: objectStateBox,
        polygon: polyFlag,
        objectId: checkedObjectIdFlag,
        color: colorHex.slice(0, boxClassList.length),
        totalFileSize: fileCount,
        totalUnConfirmSize: 0,
      };
      projectCollection.insert(tempProjectInfo);


    }



    setStartUpload(true);
  };

  useEffect(() => {
    if (startUpload) {
      setIsLoading(true);
      uploadImage(
        RawImgList.rawFile[uploadIdx],
        projectName[0].projectName,
        ImgFileInfo.imgInfo[uploadIdx].fileId
      );
    }
  }, [startUpload]);

  useEffect(() => {
    if (startUpload)
      uploadImage(
        RawImgList.rawFile[uploadIdx],
        projectName[0].projectName,
        ImgFileInfo.imgInfo[uploadIdx].fileId
      );
  }, [uploadIdx]);

  return (
    <>
      {isLoading && (
        <div className="styles.overlay">
          <Overlay opacity={0.5} color="#000" zIndex={5} />
          <div className={styles.progress}>
            <Progress value={progress} size="lg" />
          </div>
        </div>
      )}

      <div className={styles.container}>
        <SmallNavigation />

        <div>
          <ProjectTitle
            ProjectName={projectName}
            setProjectName={setProjectName}
            setGlobalError={setGlobalError}
            isMaster = {isMaster}
            setIsMaster={setIsMaster}
            tempMasterName ={tempMasterName}
            setTempMasterName={setTempMasterName}
          />
          <BoundingBoxConfig boxClassList={boxClassList} setBoxClassList={setBoxClassList} />
          <KeypointConfig
            keyPointClassList={keyPointClassList}
            setKeyPointClassList={setKeyPointClassList}
          />
          <AddState objectStateBox={objectStateBox} setObjectStateBox={setObjectStateBox} />

          <Grid style={{ margin: '14px 0' }}>
            {/*<Col span={3}>*/}
            {/*  <Switch*/}
            {/*    label='Polygon'*/}
            {/*    styles={switchStyles}*/}
            {/*    checked={checkedPolygon}*/}
            {/*    onChange={(event) => setCheckedPolygon(event.currentTarget.checked)}*/}
            {/*  ></Switch>*/}
            {/*</Col>*/}
            <Col span={3}>
              <Switch
                styles={switchStyles}
                label="Object Id"
                checked={checkedObjectIdFlag}
                onChange={(event) => setCheckedObjectIdFlag(event.currentTarget.checked)}
              ></Switch>
            </Col>
          </Grid>

          <AddImages
            ImgFileInfo={ImgFileInfo}
            setImgFileInfo={setImgFileInfo}
            RawImgList={RawImgList}
            setRawImgList={setRawImgList}
            GroundTruthJson={GroundTruthJson}
            setGroundTruthJson={setGroundTruthJson}
            fileCount={fileCount}
            jsonFileCount={jsonFileCount}
            setJsonFileCount={setJsonFileCount}
            setFileCount={setFileCount}
            WithGroundTruthFlag={WithGroundTruthFlag}
            setWithGroundTruthFlag={setWithGroundTruthFlag}
          />

          <div>
            <Button
              disabled={globalError}
              className={styles.registerButton}
              onClick={() => {
                onRegister2();
              }}
              type="submit"
              leftIcon={<i className="far fa-check-square"></i>}
            >
              프로젝트 등록하기
            </Button>
          </div>
        </div>
      </div>
      <NavigationBar />
    </>
  );
}
