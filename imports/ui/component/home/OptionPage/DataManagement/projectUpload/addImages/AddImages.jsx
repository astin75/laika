import React, { createRef, useState } from "react";
import {Button, Grid, Col, TextInput, Switch} from "@mantine/core";
import styles from "../BoundingBoxConfig/BoundingBoxConfig.module.css";
export default function AddImages(pros) {
  const [WithGroundTruthFlag, setWithGroundTruthFlag] = useState(false)
  const switchStyles = {
    label: {fontSize: 13},
  }
  const onChange = (e) => {
    let tempImgFileInfo = { imgInfo: [] };
    let tempRawImgList = { rawFile: [] };
    let tempGroundTruthJson = { List: [] };
    let count = 0;
    let RandValue = new Uint32Array(e.target.files.length);
    const switchStyles = {
      label: {fontSize: 13},
    }
    window.crypto.getRandomValues(RandValue);
    if (WithGroundTruthFlag) {
      for (count = 0; count < e.target.files.length; count++) {
        tempImgFileInfo.imgInfo.push({
          fileName: e.target.files[count].name,
          fileId: RandValue[count],
          projectName: false,
          projectID: false,
          confirmFlag: false,
        });

        tempRawImgList.rawFile.push(e.target.files[count]);
        tempGroundTruthJson.List.push({
          projectName: false,
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
    } else {
      for (count = 0; count < e.target.files.length; count++) {
        tempGroundTruthJson.List.push({
          projectName: false,
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
    pros.setImgFileInfo(tempImgFileInfo);
    pros.setRawImgList(tempRawImgList);
    pros.setGroundTruthJson(tempGroundTruthJson);
    pros.setFileCount({ count: [count] });


  };

  return (
    <div className="form-row">
      <div className="form-group col-md-3">
        <Switch
            label="Annotations"
            styles={switchStyles}
            checked={WithGroundTruthFlag}
            onChange={(event) => setWithGroundTruthFlag(event.currentTarget.checked)}
        >
        </Switch >
      </div>
      <div className="form-group col-md-4">
        <input
          type="file"
          webkitdirectory=""
          className="custom-file-input"
          onChange={onChange}
        />
        <label className="custom-file-label">
          {pros.FileCount.count !== undefined ? (
            <>파일 : {pros.FileCount.count} 개</>
          ) : (
            <>{}</>
          )}
        </label>
      </div>
    </div>
  );
}
