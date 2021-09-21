import React, { useState } from 'react'
import { ActionIcon, Badge, Button, Col, Grid, Switch, TextInput } from '@mantine/core'
import styles from '../BoundingBoxConfig/BoundingBoxConfig.module.css'

export default function KeypointConfig({ keyPointClassList, setKeyPointClassList }) {
  const [keyPointModeState, setKeyPointModeState] = useState(false)
  const [labelName, setLabelName] = useState('')
  const [errClass, setErrClass] = useState('')

  const addLabelName = () => {
    if (labelName.length < 1) {
      setErrClass('객체 이름을 넣어주세요.')
      return
    }

    setKeyPointClassList([...keyPointClassList, labelName])
    setLabelName('')
    setErrClass('')
  }

  const removeLabelName = (idx) => {
    const list = keyPointClassList.filter((dsf, index) => index !== idx)
    setKeyPointClassList(list)
  }

  return (
    <>
      <Grid style={{ margin: '14px 0' }}>
        <Col span={3}>
          <Switch
            className={styles.bboxSwitch}
            label="Key Point"
            checked={keyPointModeState}
            onChange={(event) => setKeyPointModeState(event.currentTarget.checked)}
          />
        </Col>
        {keyPointModeState && (
          <Col span={9} className={styles.addBox}>
            <TextInput
              onChange={(e) => {
                setLabelName(e.target.value)
              }}
              placeholder=""
              error={errClass}
              value={labelName}
              className={styles.textInput}
            ></TextInput>
            <Button onClick={addLabelName} className={styles.bboxAddButton}>
              추가하기
            </Button>
          </Col>
        )}
      </Grid>
      {keyPointClassList.length > 0 && (
        <Grid span={3} style={{ margin: '20px 0' }}>
          {keyPointClassList.map((data, idx) => (
            <Badge
              color={'teal'}
              key={idx}
              variant="outline"
              style={{ paddingRight: 3, marginRight: 6 }}
              rightSection={removeButton}
              onClick={() => removeLabelName(idx)}
            >
              {data}
            </Badge>
          ))}
        </Grid>
      )}
    </>
  )
}

const removeButton = (
  <ActionIcon size="xs" color="blue" radius="xl" variant="transparent">
    x
  </ActionIcon>
)
