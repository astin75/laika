import React, {createRef, useEffect, useState} from 'react';

export default function BoundingBoxConfig() {
    const [BoxModeState, setBoxModeState] = useState(false)
    const [BoxClassList, setBoxClassList] = useState({List: []})
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
            if (BoxClassList.List.length === 0) {

                let List = [{id: Date.now(), className: tempClassName}]
                setBoxClassList({List})


            } else if (BoxClassList.List.length > 4) {
                alert("최대 5개 추가 가능합니다.")
            } else {
                let List = [...BoxClassList.List,
                    {id: Date.now(), className: tempClassName}]
                setBoxClassList({List})
            }
        }


    }
    useEffect(() => {

    }, )
    return (
        <div className="form-row">
            <div className="form-group col-md-4">
                <label>Bounding Box</label>
                <select defaultValue="false" id="inputState" className="form-control" onChange={bboxInfo}>
                    <option>true</option>
                    <option>false</option>
                </select>
            </div>
            {BoxModeState ? (
                <>
                    <div className="form-group col-md-3">
                        <label>클래스 이름</label>
                        <input ref={className} className="form-control" placeholder=""/>
                    </div>
                    <div className="form-group col-md-3">
                        <br/>
                        <button type="submit" className="btn btn-success" onClick={BoxClassAdd}>추가하기</button>
                    </div>
                    <div>
                        <label>클래스 목록</label>
                        <select defaultValue="false" id="inputState" className="form-control">
                            {BoxClassList.List.map(x =>( <option>{x.className}</option>))}
                        </select>

                    </div>
                </>
            ) : (<></>)}


        </div>
    );
};