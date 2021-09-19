import React, { createRef, useEffect, useRef, useState } from 'react'
import styles from './BoundingBoxConfig.module.css'
import { Button, Grid, Col, TextInput, Switch, Badge, ActionIcon } from '@mantine/core'

export default function BoundingBoxConfig({ boxClassList, setBoxClassList }) {
  const [boxModeState, setBoxModeState] = useState(false)
  const [labelName, setLabelName] = useState('')
  const [errClass, setErrClass] = useState('')

  const addLabelName = () => {
    if (labelName.length < 1) {
      setErrClass('객체 이름을 넣어주세요.')
      return
    }

    if (boxClassList.length > 4) {
      setErrClass('최대 5개까지 추가 됩니다.')
      return
    }

    setBoxClassList([...boxClassList, labelName])
    setLabelName('')
    setErrClass('')
  }

  const removeLabelName = (idx) => {
    const list = boxClassList.filter((dsf, index) => index !== idx)
    setBoxClassList(list)
  }

  return (
    <>
      <Grid style={{ margin: '14px 0' }}>
        <Col span={3}>
          <Switch
            className={styles.bboxSwitch}
            label="Bounding Box"
            checked={boxModeState}
            onChange={(event) => setBoxModeState(event.currentTarget.checked)}
          />
        </Col>
        {boxModeState && (
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
      {boxClassList.length > 0 && (
        <Grid span={3} style={{ margin: '20px 0' }}>
          {boxClassList.map((data, idx) => (
            <Badge
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
