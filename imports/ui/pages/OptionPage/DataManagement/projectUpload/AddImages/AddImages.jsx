import { Button, Col, Grid, Switch, TextInput } from '@mantine/core'
import clsx from 'clsx'
import React, { useState } from 'react'

import styles from './AddImages.module.css'

export default function AddImages(pros) {
  const [WithGroundTruthFlag, setWithGroundTruthFlag] = useState(false)
  const switchStyles = {
    label: { fontSize: 13 },
  }
  const onChange = (e) => {
    let tempImgFileInfo = { imgInfo: [] }
    let tempRawImgList = { rawFile: [] }
    let tempGroundTruthJson = { List: [] }
    let count = 0
    let RandValue = new Uint32Array(e.target.files.length)
    const switchStyles = {
      label: { fontSize: 13 },
    }
    window.crypto.getRandomValues(RandValue)
    if (WithGroundTruthFlag) {
      for (count = 0; count < e.target.files.length; count++) {
        tempImgFileInfo.imgInfo.push({
          fileName: e.target.files[count].name,
          fileId: RandValue[count],
          projectName: false,
          masterProjectName: false,
          projectID: false,
          confirmFlag: false,
        })

        tempRawImgList.rawFile.push(e.target.files[count])
        tempGroundTruthJson.List.push({
          projectName: false,
          masterProjectName: false,
          projectId: false,
          bbox: [],
          keypoint: [],
          stateList: [],
          polygon: [],
          objectId: false,
          ImgFileId: RandValue[count],
          ImgFileName: e.target.files[count].name,
        })
      }
    } else {
      for (count = 0; count < e.target.files.length; count++) {
        tempImgFileInfo.imgInfo.push({
          fileName: e.target.files[count].name,
          fileId: RandValue[count],
          projectName: false,
          masterProjectName: false,
          projectID: false,
          confirmFlag: false,
        })

        tempRawImgList.rawFile.push(e.target.files[count])
        tempGroundTruthJson.List.push({
          projectName: false,
          masterProjectName: false,
          projectId: false,
          bbox: [],
          keypoint: [],
          stateList: [],
          polygon: [],
          objectId: false,
          ImgFileId: RandValue[count],
          ImgFileName: e.target.files[count].name,
        })
      }
    }
    pros.setImgFileInfo(tempImgFileInfo)
    pros.setRawImgList(tempRawImgList)
    pros.setGroundTruthJson(tempGroundTruthJson)
    pros.setFileCount({ count: [count] })
  }

  return (
    <Grid style={{ margin: '14px 0' }}>
      <Col span={3}>
        <Switch
          disabled
          label="Annotations"
          styles={switchStyles}
          checked={WithGroundTruthFlag}
          onChange={(event) => setWithGroundTruthFlag(event.currentTarget.checked)}
        ></Switch>
      </Col>
      <Col span={3} className={clsx(styles.fileUpload, 'form-group col-md-4')}>
        <input type="file" webkitdirectory="" className="custom-file-input" onChange={onChange} />
        <label className={clsx(styles.fileLabel, 'custom-file-label')}>
          {pros.FileCount.count !== undefined ? <>파일 : {pros.FileCount.count} 개</> : <>{}</>}
        </label>
      </Col>
    </Grid>
  )
}
