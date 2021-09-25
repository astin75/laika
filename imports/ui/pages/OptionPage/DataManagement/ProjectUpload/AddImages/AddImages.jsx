import { Button, Col, Grid, Switch, TextInput } from '@mantine/core';
import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './AddImages.module.css';

export default function AddImages(props) {
  const [WithGroundTruthFlag, setWithGroundTruthFlag] = useState(false);

  const [localJson, setLocalJson] = useState('');
  const switchStyles = {
    label: { fontSize: 13 },
  };
  const onChange = (event) => {
    let tempImgFileInfo = { imgInfo: [] };
    let tempRawImgList = { rawFile: [] };
    let tempGroundTruthJson = { List: [] };
    let count = 0;
    let Filecount = 0;
    let RandValue = new Uint32Array(event.target.files.length);
    window.crypto.getRandomValues(RandValue);
    if (WithGroundTruthFlag) {
      for (count = 0; count < event.target.files.length; count++) {
        if (event.target.files[count].name.slice(-4) === 'json') {
          // let fileUploaded = new FileReader();
          // fileUploaded.readAsText(event.target.files[count].result);
          // console.log(JSON.parse(fileUploaded));
          let reader = new FileReader();
          reader.onload = function (event) {
            let json = JSON.parse(event.target.result);

            let formatted = JSON.stringify(json, null, 2);
            console.log(formatted);

            setLocalJson(formatted);
          };
          reader.readAsText(event.target.files[count]);
          console.log(localJson, 2);
        }
      }
    } else {
      for (count = 0; count < event.target.files.length; count++) {
        if (
          event.target.files[count].name.slice(-3) === 'jpg' ||
          event.target.files[count].name.slice(-4) === 'jpeg' ||
          event.target.files[count].name.slice(-3) === 'png'
        ) {
          Filecount++;
          tempImgFileInfo.imgInfo.push({
            fileName: event.target.files[count].name,
            fileId: RandValue[count],
            projectName: false,
            masterProjectName: false,
            projectID: false,
            confirmFlag: false,
          });

          tempRawImgList.rawFile.push(event.target.files[count]);
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
            ImgFileName: event.target.files[count].name,
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
