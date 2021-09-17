import React, {createRef, useEffect, useState} from 'react';
import {Button, Grid, Col, TextInput, Switch,} from "@mantine/core";

export default function BoundingBoxConfig(props) {
    const [BoxModeState, setBoxModeState] = useState(false)
    const switchStyles = {
        label: {fontSize: 13},
    }


    let className = createRef()
    const bboxInfo = (e) => {
        e.preventDefault()
        if (e.target.value === 'true') {
            setBoxModeState(true)
        }
    }
    const BoxClassAdd = (e) => {
        e.preventDefault()
        let tempClassName = className.current.value
        if (tempClassName.length < 1)
        {
            alert("빈칸을 채워주세요.")
        }

        else {
            if (props.BoxClassList.List === undefined) {

                let List = [{id: Date.now(), className: tempClassName}]

                props.setBoxClassList({List})


            } else if (props.BoxClassList.List.length > 4) {
                alert("최대 5개 추가 가능합니다.")
            } else {
                let List = [...props.BoxClassList.List,
                    {id: Date.now(), className: tempClassName}]
                props.setBoxClassList({List})
            }
        }


    }
    useEffect(() => {

    }, )
    return (
        <Grid >

            <Col span={12} >

                <Switch
                    label="Bounding Box"
                    styles={switchStyles}
                    checked={BoxModeState}
                    onChange={(event) => setBoxModeState(event.currentTarget.checked)}
                >
                </Switch >
            </Col>
            {BoxModeState ? (
                <>
                    <Col span={3}>
                        <label>클래스 이름</label>
                        <input ref={className} className="form-control" placeholder=""/>
                    </Col>
                    <Col span={3}>
                        <br/>
                        <button type="submit" className="btn btn-success" onClick={BoxClassAdd}>추가하기</button>
                    </Col>
                    <Col span={3}>
                        <label>클래스 목록</label>
                        <select defaultValue="false" id="inputState" className="form-control">
                            {props.BoxClassList.List.map(x =>( <option>{x.className}</option>))}
                            {/*{props.BoxClassList.List !== undefined ?*/}
                            {/*    (props.BoxClassList.List.map(x =>( <option>{x.className}</option>)))*/}
                            {/*    : (<></>)}*/}
                        </select>

                    </Col>
                </>
            ) : (<></>)}


        </Grid>
    );
};