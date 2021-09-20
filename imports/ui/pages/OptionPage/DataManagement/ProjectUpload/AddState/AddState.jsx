import { ActionIcon, Badge, Button, Col, Grid, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import RemovableBadge from 'imports/ui/components/RemovableBadge'
import React, { createRef, useEffect, useRef, useState } from 'react'

import StateList from '../StateList/StateList'

export default function AddState({ objectStateBox, setObjectStateBox }) {
  const [objectState, setObjectState] = useState({ stateName: '', action1: '', action2: '' })
  const notification = useNotifications()

  const handleChange = (e) => {
    setObjectState({ ...objectState, [e.target.name]: e.target.value })
  }

  const onAdd = () => {
    if (objectStateBox.length > 1) {
      notification.showNotification({
        title: '에러!',
        message: '최대 2개까지 추가 가능합니다! 🤥',
        color: 'red',
      })
      return
    }

    const { stateName, action1, action2 } = objectState
    if (stateName && action1 && action2) {
      if (
        Object.values(objectStateBox).some((objectState) => objectState.stateName === stateName)
      ) {
        notification.showNotification({
          title: '에러!',
          message: '같은 이름의 상태값이 있습니다. 🤥',
          color: 'red',
        })
        return
      }

      setObjectStateBox([...objectStateBox, objectState])
      setObjectState({ stateName: '', action1: '', action2: '' })
    } else {
      notification.showNotification({
        title: '에러!',
        message: '상태 값을 채워 주세요.! 🤥',
        color: 'red',
      })
    }
  }

  const onRemove = (idx) => {
    const list = objectStateBox.filter((_, index) => index !== idx)
    setObjectStateBox(list)
  }

  const isDisabled = objectStateBox.length === 2

  return (
    <>
      <Grid style={{ margin: '14px 0' }}>
        <Col span={3}>
          <TextInput
            name="stateName"
            onChange={handleChange}
            description="상태"
            value={objectState.stateName}
            placeholder=""
            disabled={isDisabled}
          />
        </Col>
        <Col span={3}>
          <TextInput
            name="action1"
            onChange={handleChange}
            description="Action1"
            value={objectState.action1}
            placeholder=""
            disabled={isDisabled}
          />
        </Col>
        <Col span={3}>
          <TextInput
            name="action2"
            onChange={handleChange}
            description="Action2"
            value={objectState.action2}
            placeholder=""
            disabled={isDisabled}
          />
        </Col>
        <Col span={3}>
          <br />
          <Button color="green" onClick={onAdd} disabled={isDisabled}>
            추가하기
          </Button>
        </Col>
      </Grid>
      <Grid>
        <small className="text-muted">객체 상태를 추가할 수 있습니다. </small>
      </Grid>

      {objectStateBox.length > 0 && (
        <Grid style={{ margin: '14px 0' }}>
          {objectStateBox.map((objectState, idx) => (
            <RemovableBadge
              key={idx}
              color="grape"
              variant="filled"
              style={{ paddingRight: 3, marginRight: 6 }}
              onClick={() => onRemove(idx)}
            >
              {`${objectState.stateName} | ${objectState.action1} | ${objectState.action2}`}
            </RemovableBadge>
          ))}
        </Grid>
      )}
    </>
  )
}
