import { Button, Col, Grid, Switch, TextInput } from '@mantine/core';
import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './AddImages.module.css';

export default function AddImages(props) {
  const switchStyles = {
    label: { fontSize: 13 },
  };

  const onJson = (event) => {
    let tempGroundTruthJson = { List: [] };
    let count = 0;
    let Filecount = 0;

    for (count = 0; count < event.target.files.length; count++) {
      if (event.target.files[count].name.slice(-4) === 'json') {
        Filecount++;
        let reader = new FileReader();
        reader.onload = function (event) {
          let formatted = JSON.parse(event.target.result);
          //let formatted = JSON.stringify(json, null, 2);

          tempGroundTruthJson.List.push(formatted);
        };
        reader.readAsText(event.target.files[count]);
        props.setJsonFileCount(Filecount);
      }
    }
    props.setGroundTruthJson(tempGroundTruthJson);
  };

  const onImage = (event) => {
    let tempImgFileInfo = { imgInfo: [] };
    let tempRawImgList = { rawFile: [] };
    let tempGroundTruthJson = { List: [] };
    let count = 0;
    let Filecount = 0;
    let RandValue = new Uint32Array(event.target.files.length);
    window.crypto.getRandomValues(RandValue);
    for (count = 0; count < event.target.files.length; count++) {
      if (
        event.target.files[count].name.slice(-3) === 'jpg' ||
        event.target.files[count].name.slice(-4) === 'jpeg' ||
        event.target.files[count].name.slice(-3) === 'png'
      ) {
        Filecount++;
        tempImgFileInfo.imgInfo.push({
          ImgFileName: event.target.files[count].name,
          ImgFileId: RandValue[count],
          projectName: false,
          masterProjectName: false,
          projectID: false,
          confirmFlag: 'ready',
        });

        tempRawImgList.rawFile.push(event.target.files[count]);
        tempGroundTruthJson.List.push({
          projectName: false,
          masterProjectName: false,
          projectID: false,
          annotations: [],
          ImgFileId: RandValue[count],
          ImgFileName: event.target.files[count].name,
        });
      }
    }
    if (props.WithGroundTruthFlag) {
      props.setImgFileInfo(tempImgFileInfo);
      props.setRawImgList(tempRawImgList);
      props.setFileCount(Filecount);
    } else {
      props.setImgFileInfo(tempImgFileInfo);
      props.setRawImgList(tempRawImgList);
      props.setGroundTruthJson(tempGroundTruthJson);
      props.setFileCount(Filecount);
      props.setJsonFileCount(Filecount);
    }
  };

  return (
    <>
      <Grid style={{ margin: '14px 0' }}>
        <Col span={3} className={clsx(styles.fileUpload, 'form-group col-md-4')}>
          <input type="file" webkitdirectory="" className="custom-file-input" onChange={onImage} />
          <label className={clsx(styles.fileLabel, 'custom-file-label')}>
            Image 파일 : {props.fileCount} 개
          </label>
        </Col>
      </Grid>
      <Grid style={{ margin: '14px 0' }}>
        <Col span={3}>
          <Switch
            disabled={false}
            label="Annotations"
            styles={switchStyles}
            checked={props.WithGroundTruthFlag}
            onChange={(event) => props.setWithGroundTruthFlag(event.currentTarget.checked)}
          ></Switch>
        </Col>
        {props.WithGroundTruthFlag && (
          <Col span={3} className={clsx(styles.fileUpload, 'form-group col-md-4')}>
            <input type="file" webkitdirectory="" className="custom-file-input" onChange={onJson} />
            <label className={clsx(styles.fileLabel, 'custom-file-label')}>
              json 파일 : {props.jsonFileCount} 개
            </label>
          </Col>
        )}
      </Grid>
    </>
  );
}
