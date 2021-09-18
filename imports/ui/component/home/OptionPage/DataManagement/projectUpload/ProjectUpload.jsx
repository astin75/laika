import React, {createRef, useEffect, useState} from "react";
import AddState from "./addState/AddState";
import AddImages from "./addImages/AddImages";
import StateList from "./StateList/StateList";
import BoundingBoxConfig from "./BoundingBoxConfig/BoundingBoxConfig";
import KeypointConfig from "./KeypointConfig/KeypointConfig";
import ProjectTile from "./projectName/ProjectTile";
import styles from "./ProjectUpload.module.css";
import { useNotifications } from '@mantine/notifications';
import {useTracker} from "meteor/react-meteor-data";

import {imageInfoCollection} from "../../../../../../db/collections";
import {gtInfoCollection} from "../../../../../../db/collections";
import {projectCollection} from "../../../../../../db/collections";
import Images from "../../../../../../db/files";
import {Button, Switch,Grid, Col } from "@mantine/core";


import {Link} from "react-router-dom";

export default function ProjectUpload() {

    const [ProjectName, setProjectName] = useState({List: []})
    const [BoxClassList, setBoxClassList] = useState({List: []})
    const [KeyPointClassList, setKeyPointClassList] = useState({List: []})
    const [ObjectStateBox, setObjectStateBox] = useState({stateList: []})


    const [ImgFileInfo, setImgFileInfo] = useState({imgInfo: []})
    const [RawImgList, setRawImgList] = useState({rawFile: []})
    const [GroundTruthJson, setGroundTruthJson] = useState({List: []})
    const [FileCount, setFileCount] = useState({count: []})

    const [checkedPolygon, setCheckedPolygon] = useState(false);
    const [checkedObjectIdFlag, setCheckedObjectIdFlag] = useState(false);

    const notifications = useNotifications();
    const showNotification = () => notifications.showNotification({
        title: '',
        message: '프로젝트가 등록 되었습니다.! 🤥',
    });

    const switchStyles = {
        label: {fontSize: 13},
    }


    const stateAdd = (stateName, action1, action2) => {

        if (ObjectStateBox.stateList.length === 0) {
            let stateList = [{id: Date.now(), stateName: stateName, action1: action1, action2: action2}]
            setObjectStateBox({stateList})
        } else if (ObjectStateBox.stateList.length > 1) {
            alert("최대 2개 추가 가능합니다.")

        } else {
            let stateList = [...ObjectStateBox.stateList,
                {id: Date.now(), stateName: stateName, action1: action1, action2: action2}]
            setObjectStateBox({stateList})
        }


    }

    const stateEdit = (stateName, action1, action2) => {
        let stateList = [...ObjectStateBox.stateList];
        const index = stateList.indexOf(stateName);
        stateList[index].action1 = action1;
        stateList[index].action2 = action2;
        setObjectStateBox({stateList});
    };

    const onRegister = (e) => {
        e.preventDefault();
        let RandValue = new Uint32Array(1);
        window.crypto.getRandomValues(RandValue);

        let bbox = BoxClassList;
        let keypoint = KeyPointClassList;
        let stateList = ObjectStateBox;
        let polygon = checkedPolygon;
        let objectId = checkedObjectIdFlag;


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
            tempGroundTruthJson[count].projectName = ProjectName[0].projectName;
            tempImgFileInfo[count].projectID = RandValue[0];
            tempImgFileInfo[count].projectName = ProjectName[0].projectName;
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
        console.log(ProjectName)

        let tempProjectInfo = {
            projectName: ProjectName[0].projectName,
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
        showNotification()
    };

    useEffect(() => {
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.topMenu}>
                    <Button className={styles.topMenuButton} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                            component={Link} to="/projectListPage"
                    >프로젝트 리스트</Button >
                    <Button className={styles.topMenuButton}  variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }}
                            component={Link} to="/projectListPage"
                    >계정 관리</Button >
                </div>

                <div>
                    <ProjectTile
                        setProjectName={setProjectName}
                        ProjectName={ProjectName}
                    />


                    <BoundingBoxConfig
                        BoxClassList={BoxClassList}
                        setBoxClassList={setBoxClassList}
                    />

                    <Grid>
                    <KeypointConfig
                        KeyPointClassList={KeyPointClassList}
                        setKeyPointClassList={setKeyPointClassList}
                    />
                    </Grid>

                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <Switch
                                label="Polygon"
                                styles={switchStyles}
                                checked={checkedPolygon}
                                onChange={(event) => setCheckedPolygon(event.currentTarget.checked)}
                            >
                            </Switch >
                        </div>
                        <div className="form-group col-md-3">
                            <Switch
                                styles={switchStyles}
                                label="Object Id"

                                checked={checkedObjectIdFlag}
                                onChange={(event) => setCheckedObjectIdFlag(event.currentTarget.checked)}
                            >
                            </Switch >

                        </div>
                    </div>
                    {ObjectStateBox.stateList.length > 0 ? (
                        <StateList stateEdit={stateEdit} ObjectStateBox={ObjectStateBox}/>
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
                        <Button
                            onClick={onRegister}
                            type="submit"
                            leftIcon={<i className="far fa-check-square"></i>}
                        >
                            {" "}
                            프로젝트 등록하기
                        </Button>
                    </div>
                </div>
                <AddState stateAdd={stateAdd}/>
            </div>
        </main>
    );
}
