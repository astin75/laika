import { Button, Col, Grid, Overlay, Progress, Switch } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { imageInfoCollection } from 'imports/db/collections'
import { gtInfoCollection } from 'imports/db/collections'
import { projectCollection } from 'imports/db/collections'
import Images from 'imports/db/files'
import { chunk } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import NavigationBar from '../../../../components/NavigationBar/NavigationBar'
import AddImages from './AddImages/AddImages'
import AddState from './AddState/AddState'
import BoundingBoxConfig from './BoundingBoxConfig/BoundingBoxConfig'
import KeypointConfig from './KeypointConfig/KeypointConfig'
import ProjectTitle from './ProjectTitle/ProjectTitle'
// @ts-ignore
import styles from './ProjectUpload.module.css'

const CHUNK_SIZE = 500

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
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  // const step = 10
  // const interval = 100
  // const maxProgress = 100

  // const [progressPercentage, setProgressPercentage] = useState(0)

  const notifications = useNotifications()
  const showNotification = () =>
    notifications.showNotification({
      title: '',
      message: '프로젝트가 등록 되었습니다.! 🤥',
    })

  const switchStyles = {
    label: { fontSize: 13 },
  }

  const insertImage = (file) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        const upload = Images.insert(
          {
            file,
            chunkSize: 'dynamic',
          },
          false
        )
        upload.start()
        resolve()
      }, 0)
    )
  }

  const onRegister = async () => {
    let RandValue = new Uint32Array(1)
    window.crypto.getRandomValues(RandValue)

    // console.log(ImgFileInfo)
    // console.log(RawImgList)
    // [...ImgFileInfo.fileName, ...ImgFileInfo.fileId,...ImgFileInfo.projectID,...ImgFileInfo.confirmFlag]
    let tempImgFileInfo = [...ImgFileInfo.imgInfo]
    let tempGroundTruthJson = [...GroundTruthJson.List]
    let unConfirmed = 0
    let percentage = 0
    try {
      const imageFileArray = chunk(tempImgFileInfo, CHUNK_SIZE)
      let imageIndex = 0
      let chunkCount = 0
      let innerCount = 0
      for (; chunkCount < imageFileArray.length; chunkCount++) {
        for (; innerCount < fileCount; innerCount++) {
          percentage = (imageIndex / fileCount) * 100
          tempGroundTruthJson[imageIndex].projectID = RandValue[0]
          tempGroundTruthJson[imageIndex].projectName = projectName[0].projectName
          tempGroundTruthJson[imageIndex].masterProjectName = projectName[0].masterProjectName
          tempImgFileInfo[imageIndex].projectID = RandValue[0]
          tempImgFileInfo[imageIndex].projectName = projectName[0].projectName
          tempImgFileInfo[imageIndex].masterProjectName = projectName[0].masterProjectName
          imageInfoCollection.insert(tempImgFileInfo[imageIndex])
          gtInfoCollection.insert(tempImgFileInfo[imageIndex])
          await insertImage(RawImgList.rawFile[imageIndex])
          await setProgress(percentage)
          imageIndex++
        }
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

      await projectCollection.insert(tempProjectInfo)
      showNotification()
    } catch (e) {
      //seterrclass로 알려주기
    }

    // console.log('progress', progress, progress > 0 && progress < 100)
    // console.log('progress > 0 && progress < 100 &&')
  }

  // useEffect(() => {
  //   // const updateProgress = () => setProgressPercentage(progressPercentage + step)
  //   if (progressPercentage > 0) {
  //     if (progressPercentage < 100) {
  //       setTimeout(() => {
  //         console.log(count)
  //         console.log(progressPercentage)
  //         onRegister()
  //         setProgressPercentage(progressPercentage + step)
  //       }, 0)
  //     }
  //   }
  // }, [progressPercentage])

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
            to="/userControlPage"
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
              onClick={async () => {
                setIsLoading(true)
                await onRegister()
                setIsLoading(false)
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
  )
}
