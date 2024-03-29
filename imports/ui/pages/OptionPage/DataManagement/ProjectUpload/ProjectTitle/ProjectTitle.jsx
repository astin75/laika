import { Button, Col, Grid, Select, Switch, TextInput } from '@mantine/core';
import { projectCollection } from 'imports/db/collections';
import { useTracker } from 'meteor/react-meteor-data';
import React, { createRef, useEffect, useRef, useState } from 'react';

import styles from './ProjectTitle.module.css';

export default function ProjectTitle({ projectName, setProjectName, setGlobalError, isMaster, setIsMaster, tempMasterName, setTempMasterName }) {
  const projectList = useTracker(() => projectCollection.find({}).fetch());
  const [DBFlag, setDBFlag] = useState(true);
  const [tempProjectList, setTempProjectList] = useState([]);

  const [errName, setErrName] = useState('');
  const switchStyles = {
    label: { fontSize: 13 },
  };

  const MasterName = (e) => {
    setIsMaster(e.currentTarget.checked);
    if (e.currentTarget.checked === false) {
      setDBFlag(true);
    }
  };

  const loadMatserProject = (e) => {

    if(isMaster){
      let masterProject = projectCollection.findOne({ projectName:e });

      setTempMasterName(masterProject)

    }
  }

  const putName = (e) => {
    if (e.target.value.length < 4) {
      setErrName('4자 이상 입력해주세요.');
      setGlobalError(true);
      return;
    }

    if (projectCollection.findOne({ projectName: e.target.value })) {
      setErrName('동일한 일반 프로젝트 명이 있습니다.');
      setGlobalError(true);
      return;
    }

    setErrName('');
    if(isMaster){
      setProjectName([
        {
          masterProjectName: tempMasterName.projectName,
          projectName: e.target.value,
        },
      ]);

    }
    else{
      setProjectName([
        {
          masterProjectName: '',
          projectName: e.target.value,
        },
      ]);

    }


    setGlobalError(false);
  };

  useEffect(() => {
    let masterProjectList = [];

    if (projectList !== undefined && DBFlag) {
      projectList.map((x) => {
        masterProjectList.push({ value: x.projectName, label: x.projectName });
      });
      setTempProjectList(masterProjectList);
      setDBFlag(false);
    }
  }, [projectList]);

  return (
    <Grid>
      <Col span={4}>
        <TextInput
          onChange={(event) => putName(event)}
          label={'Project Name'}
          error={errName}
          className={styles.textInput}
        ></TextInput>
      </Col>
      <Col span={3}>
        <Switch
          className={styles.masterSwitch}
          label="Is Master"
          styles={switchStyles}
          checked={isMaster}
          onChange={(event) => MasterName(event)}
        ></Switch>
      </Col>
      <Col span={3}>
        {isMaster && (
          <Select
            className={styles.masterSelect}
            data={tempProjectList}
            onChange={(event) => loadMatserProject(event)}
          />
        )}
      </Col>
    </Grid>
  );
}
