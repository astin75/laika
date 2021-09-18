import React, { createRef, useEffect, useRef, useState } from 'react'
import styles from './BoundingBoxConfig.module.css'
import { Button, Grid, Col, TextInput, Switch, MultiSelect } from '@mantine/core'

export default function BoundingBoxConfig(props) {
  const [BoxModeState, setBoxModeState] = useState(false)
  const [className, setClassName] = useState('')
  const [errClass, setErrClass] = useState('')
  const [data, setData] = useState([])
  const [defaultData, setDefaultData] = useState(['pp'])

  const ref = useRef(null)

  const switchStyles = {
    label: { fontSize: 13 },
  }

  const BoxClassAdd = (e) => {
    let tempData = [...data]
    let defaultList = []
    let tempDefaultData = defaultData

    e.preventDefault()
    let tempClassName = className
    if (tempClassName.length < 1) {
      setErrClass('객체 이름을 넣어주세요.')
    } else {
      if (props.BoxClassList.List === undefined) {
        let List = [{ id: Date.now(), className: tempClassName }]
        props.setBoxClassList({ List })
        tempData[tempData.length] = { value: tempClassName, label: tempClassName }

        setData(tempData)
        defaultList.push(tempClassName)
        setDefaultData(defaultList)
        setErrClass('')
      } else if (props.BoxClassList.List.length > 4) {
        setErrClass('최대 5개까지 추가 됩니다.')
      } else {
        let List = [...props.BoxClassList.List, { id: Date.now(), className: tempClassName }]
        props.setBoxClassList({ List })
        tempData[tempData.length] = { value: tempClassName, label: tempClassName }
        setData(tempData)
        defaultList.push('op')
        setDefaultData({ defaultList })
        console.log(defaultList)
        setErrClass('')
      }
    }
  }
  useEffect(() => {}, [data, defaultData])
  return (
    <Grid style={{ marginTop: 10 }}>
      <Col span={3}>
        <Switch
          className={styles.bboxSwitch}
          label="Bounding Box"
          styles={switchStyles}
          checked={BoxModeState}
          onChange={(event) => setBoxModeState(event.currentTarget.checked)}
        ></Switch>
      </Col>
      {BoxModeState ? (
        <>
          <Col span={3}>
            <TextInput
              onChange={(e) => {
                setClassName(e.target.value)
              }}
              placeholder=""
              error={errClass}
              className={styles.textInput}
            ></TextInput>
          </Col>
          <Col span={3}>
            <Button onClick={BoxClassAdd}>추가하기</Button>
          </Col>
          <Col span={3}>
            <MultiSelect
              data={data}
              defaultValue={defaultData}
              elementRef={ref}
              label="Your favorite frameworks/libraries"
              placeholder="Pick all that you like"
            />
          </Col>
        </>
      ) : (
        <></>
      )}
    </Grid>
  )
}
