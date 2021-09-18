import React, {useEffect, useState, useRef, createRef} from 'react';
import {Button, Grid, Col, TextInput, Switch, Select} from "@mantine/core";
import styles from "./ProjectTile.module.css"
import {projectCollection} from "../../../../../../../db/collections";
import {useTracker} from "meteor/react-meteor-data";

export default function ProjectTile(props) {
    const projectList = useTracker(() => projectCollection.find({}).fetch());
    const [DBFlag, setDBFlag] = useState(true)
    const ref = createRef()
    const [tempProjectList, setTempProjectList] = useState([])
    const [tempMasterName, setTempMasterName] = useState("")
    const [IsMaster, setIsMaster] = useState(true)
    const [TempProjectName, setTempProjectName] = useState("");
    const [errName, setErrName] = useState("");
    const switchStyles = {
        label: {fontSize: 13},
    }


    const MasterName = (e) => {
        let tempIsMaster = e.currentTarget.checked
        setIsMaster(tempIsMaster)
        if (tempIsMaster === false){
            setDBFlag(true)
        }
    }

    const putName = (e) => {
        let projtName = e.target.value

        if (projtName.length < 4) {
            setErrName("4자 이상 입력해주세요.")
        } else {
            setErrName("")
            let List = [{masterProjectName: tempMasterName, projectName: projtName}]
            props.setProjectName(List)

        }
    }

    useEffect(() => {

        let masterProjectList = []

        if (projectList !== undefined && DBFlag){
            projectList.map((x) => {
                masterProjectList.push({value:x.projectName,label:x.projectName})
        })
            setTempProjectList(masterProjectList)
            setDBFlag(false)
        }


    }, [TempProjectName, projectList])


    return (
        <Grid>
            <Col span={3}>
                <TextInput onChange={(event) => putName(event)}

                 label={"Project Name"} error={errName}
                          className={styles.textInput}></TextInput>
            </Col>
            <Col span={3}>
                <Switch

                    label="Is Master"
                    styles={switchStyles}
                    checked={IsMaster}
                    onChange={(event) => MasterName(event) }
                >
                </Switch >
            </Col>
            <Col span={3}>
                {IsMaster === false ?
                    (<Select
                        data={tempProjectList}
                        onChange={(event)=>setTempMasterName(event)}
                />):(<></>)}
            </Col>
        </Grid>
    );
};