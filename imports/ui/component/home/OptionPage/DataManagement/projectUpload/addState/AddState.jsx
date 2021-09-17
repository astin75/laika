import React, {createRef, useRef, useState} from 'react';
import {Button, Grid, Col, TextInput, } from "@mantine/core";
import { useNotifications } from '@mantine/notifications';

export default function AddState(props) {
    const [stateName, setStateName] = useState(false);
    const [action1, setAction1] = useState(false);
    const [action2, setAction2] = useState(false);
    const notifications = useNotifications();
    const showNotification = () => notifications.showNotification({
        title: '에러!',
        message: '상태 값을 채워 주세요.! 🤥',
        color: 'red'
    });


    const onAdd = (e) => {
        e.preventDefault()
        if (stateName !== false &&
            action1 !== false &&
            action2 !== false) {

            props.stateAdd(stateName, action1, action2)
            setStateName(false)
            setAction1(false)
            setAction2(false)
        } else {

            showNotification()

        }
    }
    return (
        <div>

            <Grid>
                <Col span={3}>
                    <TextInput onChange={(e) => {
                        setStateName(e.target.value);
                    }} description="상태" placeholder=""></TextInput>
                </Col>
                <Col span={3}>
                    <TextInput
                        onChange={(e) => {
                            setAction1(e.target.value);
                        }}
                        description="Action1" placeholder=""></TextInput>
                </Col>
                <Col span={3}>
                    <TextInput
                        onChange={(e) => {
                            setAction2(e.target.value);
                        }}
                        description="Action2" placeholder=""></TextInput>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button color="green" onClick={onAdd}> 추가하기</Button>
                </Col>
            </Grid>
            <small className="text-muted">객체 상태를 추가할 수 있습니다. </small>
        </div>
    );
};