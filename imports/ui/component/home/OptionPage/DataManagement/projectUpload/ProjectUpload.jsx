import React, { createRef, useEffect, useState } from "react";
import AddState from "./addState/AddState";
import AddImages from "./addImages/AddImages";
import StateList from "./StateList/StateList";
import BoundingBoxConfig from "./BoundingBoxConfig/BoundingBoxConfig";
import KeypointConfig from "./KeypointConfig/KeypointConfig";
import styles from "./ProjectUpload.module.css";
import { useTracker } from "meteor/react-meteor-data";

import { imageInfoCollection } from "../../../../../../db/collections";
import { gtInfoCollection } from "../../../../../../db/collections";
import { projectCollection } from "../../../../../../db/collections";
import Images from "../../../../../../db/files";

export default function ProjectUpload() {

    const [BoxClassList, setBoxClassList] = useState({List: []})
    const [KeyPointClassList, setKeyPointClassList] = useState({List: []})
    const [ObjectStateBox, setObjectStateBox] = useState({stateList: []})

    const [ImgFileInfo, setImgFileInfo] = useState({imgInfo:[]})
    const [RawImgList, setRawImgList] = useState({rawFile:[]})
    const [GroundTruthJson, setGroundTruthJson] = useState({List: []})
    const [FileCount, setFileCount] = useState({count:[]})


    let ProjectNameRef = createRef()
    let PolygonFlag = createRef()
    let ObjectIdFlag = createRef()



    const stateAdd = (stateName, action1, action2) => {

        if (ObjectStateBox.stateList.length === 0) {
            let stateList = [{id: Date.now(), stateName: stateName, action1: action1, action2: action2}]
            setObjectStateBox({stateList})
        }
        else if (ObjectStateBox.stateList.length > 1){
            alert("최대 2개 추가 가능합니다.")

        }
        else {
            let stateList = [...ObjectStateBox.stateList,
                {id: Date.now(), stateName: stateName, action1: action1, action2: action2}]
            setObjectStateBox({stateList})
        }


    }
  };

  const stateEdit = (stateName, action1, action2) => {
    let stateList = [...ObjectStateBox.stateList];
    const index = stateList.indexOf(stateName);
    stateList[index].action1 = action1;
    stateList[index].action2 = action2;
    setObjectStateBox({ stateList });
  };

  const onRegister = (e) => {
    e.preventDefault();
    let RandValue = new Uint32Array(1);
    window.crypto.getRandomValues(RandValue);

    let projectName = ProjectNameRef.current.value;
    let bbox = BoxClassList;
    let keypoint = KeyPointClassList;
    let stateList = ObjectStateBox;
    let polygon = PolygonFlag.current.value;
    let objectId = ObjectIdFlag.current.value;

    if (projectName.length < 4) {
      alert("프로젝트 이름은 4자 이상으로 해주세요.");
    }

    let upload;
    // console.log(ImgFileInfo)
    // console.log(RawImgList)
    // [...ImgFileInfo.fileName, ...ImgFileInfo.fileId,...ImgFileInfo.projectID,...ImgFileInfo.confirmFlag]
    let tempImgFileInfo = [...ImgFileInfo.imgInfo];
    let tempGroundTruthJson = [...GroundTruthJson.List];
    let unConfirmed = 0;
    let count = 0;

    for (count = 0; count < FileCount.count; count++) {
      tempGroundTruthJson[count].projectID = RandValue[0];
      tempGroundTruthJson[count].projectName = projectName;
      tempImgFileInfo[count].projectID = RandValue[0];
      tempImgFileInfo[count].projectName = projectName;
      imageInfoCollection.insert(tempImgFileInfo[count]);
      gtInfoCollection.insert(tempImgFileInfo[count]);

      upload = Images.insert(
        {
          file: RawImgList.rawFile[count],
          chunkSize: "dynamic",
        },
        false
      );
      upload.on("start", function () {
        //console.log('Starting');
      });

      upload.on("end", function (error, fileObj) {
        //console.log('On end File Object: ', fileObj);
      });

      upload.on("uploaded", function (error, fileObj) {
        //console.log('uploaded: ', fileObj);})

        upload.start();
      });
    }

    let tempProjectInfo = {
      projectName: projectName,
      projectId: RandValue[0],
      bbox: bbox,
      keypoint: keypoint,
      stateList: stateList,
      polygon: polygon,
      objectId: objectId,
      totalFileSize: FileCount.count,
      totalUnConfirmSize: unConfirmed,
    };

    projectCollection.insert(tempProjectInfo);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Project Name</label>
          <input ref={ProjectNameRef} className="form-control" placeholder="" />
          <small className="form-text text-muted">
            프로젝트이름을 입력해주세요.
          </small>
        </div>
        <BoundingBoxConfig
          BoxClassList={BoxClassList}
          setBoxClassList={setBoxClassList}
        />
        <KeypointConfig
          KeyPointClassList={KeyPointClassList}
          setKeyPointClassList={setKeyPointClassList}
        />

        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Polygon</label>
            <select
              ref={PolygonFlag}
              defaultValue="false"
              className="form-control"
            >
              <option>true</option>
              <option>false</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label>Object ID</label>
            <select
              ref={ObjectIdFlag}
              defaultValue="false"
              className="form-control"
            >
              <option>true</option>
              <option>false</option>
            </select>
          </div>
        </div>
        {ObjectStateBox.stateList.length > 0 ? (
          <StateList stateEdit={stateEdit} ObjectStateBox={ObjectStateBox} />
        ) : (
          <div></div>
        )}

        <AddImages
          ImgFileInfo={ImgFileInfo}
          setImgFileInfo={setImgFileInfo}
          RawImgList={RawImgList}
          setRawImgList={setRawImgList}
          GroundTruthJson={GroundTruthJson}
          setGroundTruthJson={setGroundTruthJson}
          FileCount={FileCount}
          setFileCount={setFileCount}
        />

        <div className="form-group">
          <button
            onClick={onRegister}
            type="submit"
            className="btn btn-primary btn-block"
          >
            {" "}
            Register
          </button>
        </div>
        <br />
      </form>
      <AddState stateAdd={stateAdd} />
    </div>
  );
}
