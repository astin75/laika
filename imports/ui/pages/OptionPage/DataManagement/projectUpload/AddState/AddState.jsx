import React, { createRef, useEffect, useRef, useState } from 'react'
import { Button, Grid, Col, TextInput, Badge, ActionIcon } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import StateList from '../StateList/StateList'

export default function AddState({ objectStateBox, setObjectStateBox }) {
  const [stateName, setStateName] = useState('')
  const [action1, setAction1] = useState('')
  const [action2, setAction2] = useState('')
  const [tempStateList, setTempStateList] = useState([])
  const notifications1 = useNotifications()
  const notifications2 = useNotifications()
  const fullNotification = () =>
    notifications2.fullNotification({
      title: '에러!',
      message: '상태 값을 채워 주세요.! 🤥',
      color: 'red',
    })
  const showNotification = () =>
    notifications1.showNotification({
      title: '에러!',
      message: '최대 2개까지 추가 가능합니다! 🤥',
      color: 'red',
    })

  const onAdd = (e) => {
    if (objectStateBox.length > 2) {
      fullNotification()
      return
    }
    e.preventDefault()
    if (stateName !== '' && action1 !== '' && action2 !== '') {
      setObjectStateBox([
        ...objectStateBox,
        { stateName: stateName, action1: action1, action2: action2 },
      ])
      setStateName('')
      setAction1('')
      setAction2('')
    } else {
      showNotification()
    }
  }

  const removeLabelName = (idx) => {
    const list = objectStateBox.filter((dsf, index) => index !== idx)
    const list2 = tempStateList.filter((dsf, index) => index !== idx)

    setObjectStateBox(list)
    setTempStateList(list2)
  }
  useEffect(() => {
    objectStateBox.map((x) => {
      setTempStateList([
        ...tempStateList,
        ''.concat(x.stateName, ' | ', x.action1, ' | ', x.action2, ' '),
      ])
    })
  }, [objectStateBox])
  return (
    <>
      <Grid style={{ margin: '14px 0' }}>
        <Col span={3}>
          <TextInput
            onChange={(e) => {
              setStateName(e.target.value)
            }}
            description="상태"
            value={stateName}
            placeholder=""
          ></TextInput>
        </Col>
        <Col span={3}>
          <TextInput
            onChange={(e) => {
              setAction1(e.target.value)
            }}
            description="Action1"
            value={action1}
            placeholder=""
          ></TextInput>
        </Col>
        <Col span={3}>
          <TextInput
            onChange={(e) => {
              setAction2(e.target.value)
            }}
            description="Action2"
            value={action2}
            placeholder=""
          ></TextInput>
        </Col>
        <Col span={3}>
          <br />
          <Button color="green" onClick={onAdd}>
            {' '}
            추가하기
          </Button>
        </Col>
        <small className="text-muted">객체 상태를 추가할 수 있습니다. </small>
      </Grid>
      {tempStateList.length > 0 && (
        <Grid span={3} style={{ margin: '20px 0' }}>
          {tempStateList.map((data, idx) => (
            <Badge
              key={idx}
              color="grape"
              variant="filled"
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
