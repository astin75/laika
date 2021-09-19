import { Button, Col, Grid, Overlay, Progress, Switch } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { imageInfoCollection } from 'imports/db/collections'
import { gtInfoCollection } from 'imports/db/collections'
import { projectCollection } from 'imports/db/collections'
import Images from 'imports/db/files'
import { OverlayContext } from 'imports/ui/App'
import { useTracker } from 'meteor/react-meteor-data'
import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import NavigationBar from '../../../../components/NavigationBar/NavigationBar'
import AddImages from './AddImages/AddImages'
import AddState from './AddState/AddState'
import BoundingBoxConfig from './BoundingBoxConfig/BoundingBoxConfig'
import KeypointConfig from './KeypointConfig/KeypointConfig'
import ProjectTitle from './ProjectTitle/ProjectTitle'
// @ts-ignore
import styles from './ProjectUpload.module.css'
import StateList from './StateList/StateList'

export default function ProjectUpload() {
  const [projectName, setProjectName] = useState([{ masterProjectName: true, projectName: '' }])
  const [boxClassList, setBoxClassList] = useState([])
  const [keyPointClassList, setKeyPointClassList] = useState([])
  const [objectStateBox, setObjectStateBox] = useState([])

  const [ImgFileInfo, setImgFileInfo] = useState({ imgInfo: [] })
  const [RawImgList, setRawImgList] = useState({ rawFile: [] })
  const [GroundTruthJson, setGroundTruthJson] = useState({ List: [] })
  const [fileCount, setFileCount] = useState(0)

  const [checkedPolygon, setCheckedPolygon] = useState(false)
  const [checkedObjectIdFlag, setCheckedObjectIdFlag] = useState(false)

  // const [percent, setPercent] = useState(0)
  const percent = useRef(0)
  const [progress, setProgress] = useState(50)

  const notifications = useNotifications()
  const showNotification = () =>
    notifications.showNotification({
      title: '',
      message: '프로젝트가 등록 되었습니다.! 🤥',
    })

  const switchStyles = {
    label: { fontSize: 13 },
  }

  const onRegister = (e) => {
    e.preventDefault()
    let RandValue = new Uint32Array(1)
    window.crypto.getRandomValues(RandValue)

    let upload
    // console.log(ImgFileInfo)
    // console.log(RawImgList)
    // [...ImgFileInfo.fileName, ...ImgFileInfo.fileId,...ImgFileInfo.projectID,...ImgFileInfo.confirmFlag]
    let tempImgFileInfo = [...ImgFileInfo.imgInfo]
    let tempGroundTruthJson = [...GroundTruthJson.List]
    let unConfirmed = 0
    let count = 0

    for (count = 0; count < fileCount; count++) {
      tempGroundTruthJson[count].projectID = RandValue[0]
      tempGroundTruthJson[count].projectName = projectName[0].projectName
      tempGroundTruthJson[count].masterProjectName = projectName[0].masterProjectName
      tempImgFileInfo[count].projectID = RandValue[0]
      tempImgFileInfo[count].projectName = projectName[0].projectName
      tempImgFileInfo[count].masterProjectName = projectName[0].masterProjectName
      imageInfoCollection.insert(tempImgFileInfo[count])
      gtInfoCollection.insert(tempImgFileInfo[count])

      upload = Images.insert(
        {
          file: RawImgList.rawFile[count],
          chunkSize: 'dynamic',
        },
        false
      )
      upload.on('start', function () {
        //console.log('Starting');
        percent.current = Math.floor((count / fileCount) * 100)
      })

      upload.on('end', function (error, fileObj) {
        //console.log('On end File Object: ', fileObj);
      })

      upload.on('uploaded', function (error, fileObj) {
        //console.log('uploaded: ', fileObj);})
      })

      upload.start()
    }

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
      polygon: checkedPolygon,
      objectId: checkedObjectIdFlag,
      totalFileSize: fileCount,
      totalUnConfirmSize: unConfirmed,
    }

    projectCollection.insert(tempProjectInfo)
    showNotification()
  }

  console.log('pp', percent)

  useEffect(() => {
    setProgress(percent.current)
    console.log('progress', progress)
    console.log('percent.current', percent.current)
  }, [percent.current])

  const isOverlay = useContext(OverlayContext)

  return (
    <>
      {isOverlay && (
        <div style={{ position: 'absolute' }}>
          <Progress value={50} />
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.topMenu}>
          <Button
            className={styles.topMenuButton}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            component={Link}
            to="/projectListPage"
          >
            프로젝트 리스트
          </Button>
          <Button
            className={styles.topMenuButton}
            variant="gradient"
            gradient={{ from: 'grape', to: 'pink', deg: 35 }}
            component={Link}
            to="/projectListPage"
          >
            계정 관리
          </Button>
        </div>

        <div>
          <ProjectTitle ProjectName={projectName} setProjectName={setProjectName} />
          <BoundingBoxConfig boxClassList={boxClassList} setBoxClassList={setBoxClassList} />
          <KeypointConfig
            keyPointClassList={keyPointClassList}
            setKeyPointClassList={setKeyPointClassList}
          />
          <AddState objectStateBox={objectStateBox} setObjectStateBox={setObjectStateBox} />

          <Grid style={{ margin: '14px 0' }}>
            <Col span={3}>
              <Switch
                label="Polygon"
                styles={switchStyles}
                checked={checkedPolygon}
                onChange={(event) => setCheckedPolygon(event.currentTarget.checked)}
              ></Switch>
            </Col>
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
            setFileCount={setFileCount}
          />

          <div>
            <Button
              className={styles.registerButton}
              onClick={onRegister}
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
  )
}
