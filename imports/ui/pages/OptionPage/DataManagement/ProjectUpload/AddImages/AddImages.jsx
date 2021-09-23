import { Button, Col, Grid, Switch, TextInput } from '@mantine/core';
import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './AddImages.module.css';

export default function AddImages(props) {
  const [WithGroundTruthFlag, setWithGroundTruthFlag] = useState(false);
  const switchStyles = {
    label: { fontSize: 13 },
  };
  const onChange = (e) => {
    let tempImgFileInfo = { imgInfo: [] };
    let tempRawImgList = { rawFile: [] };
    let tempGroundTruthJson = { List: [] };
    let count = 0;
    let Filecount = 0;
    let RandValue = new Uint32Array(e.target.files.length);
    window.crypto.getRandomValues(RandValue);
    if (WithGroundTruthFlag) {
      if (e.target.files[1].name.slice(-4) === 'json') {
        let reader = new FileReader();
        reader.onload = function (e) {
          let json = JSON.parse(e.target.result[1]);
          let formatted = JSON.stringify(json, null, 2);
          console.log(formatted);
        };
      }
    } else {
      for (count = 0; count < e.target.files.length; count++) {
        if (e.target.files[count].name.slice(-4) !== 'json') {
          Filecount++;
          tempImgFileInfo.imgInfo.push({
            fileName: e.target.files[count].name,
            fileId: RandValue[count],
            projectName: false,
            masterProjectName: false,
            projectID: false,
            confirmFlag: false,
          });

          tempRawImgList.rawFile.push(e.target.files[count]);
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
          });
        }
      }
    }
    props.setImgFileInfo(tempImgFileInfo);
    props.setRawImgList(tempRawImgList);
    props.setGroundTruthJson(tempGroundTruthJson);
    props.setFileCount(Filecount);
  };

  return (
    <Grid style={{ margin: '14px 0' }}>
      <Col span={3}>
        <Switch
          disabled={false}
          label="Annotations"
          styles={switchStyles}
          checked={WithGroundTruthFlag}
          onChange={(event) => setWithGroundTruthFlag(event.currentTarget.checked)}
        ></Switch>
      </Col>
      <Col span={3} className={clsx(styles.fileUpload, 'form-group col-md-4')}>
        <input type="file" webkitdirectory="" className="custom-file-input" onChange={onChange} />
        <label className={clsx(styles.fileLabel, 'custom-file-label')}>
          파일 : {props.fileCount} 개
        </label>
      </Col>
    </Grid>
  );
}
