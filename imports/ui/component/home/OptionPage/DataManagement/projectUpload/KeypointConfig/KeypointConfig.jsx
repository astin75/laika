import React, {createRef, useEffect, useState} from 'react';

export default function KeypointConfig(props) {
    const [KeyPointModeState, setKeyPointModeState] = useState(false)

    let className = createRef()
    const keyPointInfo = (e) => {
        e.preventDefault()
        if (e.target.value === 'true') {
            setKeyPointModeState(true)
        }
    }
    const KeyPointClassAdd = (e) => {
        e.preventDefault()
        let tempClassName = className.current.value
        if (tempClassName.length < 1)
        {
            alert("빈칸을 채워주세요.")
        }
        else {
            if (props.KeyPointClassList.List.length === 0) {

                let List = [{id: Date.now(), className: tempClassName}]
                props.setKeyPointClassList({List})

            } else if (KeyPointClassList.List.length > 19) {
                alert("최대 20개 추가 가능합니다.")
            } else {
                let List = [...props.KeyPointClassList.List,
                    {id: Date.now(), className: tempClassName}]
                props.setKeyPointClassList({List})
            }
        }
    }
    useEffect(() => {

    }, )
    return (
        <div className="form-row">
            <div className="form-group col-md-4">
                <label>Key Point</label>
                <select defaultValue="false" id="inputState" className="form-control" onChange={keyPointInfo}>
                    <option>true</option>
                    <option>false</option>
                </select>
            </div>
            {KeyPointModeState ? (
                <>
                    <div className="form-group col-md-3">
                        <label>클래스 이름</label>
                        <input ref={className} className="form-control" placeholder=""/>
                    </div>
                    <div className="form-group col-md-3">
                        <br/>
                        <button type="submit" className="btn btn-success" onClick={KeyPointClassAdd}>추가하기</button>
                    </div>
                    <div>
                        <label>클래스 목록</label>
                        <select defaultValue="false" id="inputState" className="form-control">
                            {props.KeyPointClassList.List.map(x =>( <option>{x.className}</option>))}
                        </select>

                    </div>
                </>
            ) : (<></>)}


        </div>
    );
};