import React, {createRef, useRef} from 'react';
export default function AddState (props) {
    let stateName = createRef()
    let action1 = createRef()
    let action2 = createRef()
    const onAdd = (e) => {
        e.preventDefault()
        if (stateName.current.value.length > 0 &&
            action1.current.value.length > 0 &&
            action2.current.value.length > 0)
        {

            props.stateAdd(stateName.current.value, action1.current.value, action2.current.value)
        }
        else{
            alert("값을 채워 주세요.")
        }
    }


    return (
        <form>

            <div className="form-row">
                <div className="form-group col-md-3">
                    <label>상태 이름</label>
                    <input ref={stateName}  className="form-control" placeholder=""/>
                </div>
                <div className="form-group col-md-3">
                    <label>Action1</label>
                    <input ref={action1}  className="form-control" placeholder=""/>
                </div>
                <div className="form-group col-md-3">
                    <label>Action2</label>
                    <input ref={action2}  className="form-control" placeholder=""/>
                </div>
                <div className="form-group">
                    <br/>
                    <button type="submit" className="btn btn-success" onClick={onAdd}> 추가하기</button>
                </div>
            </div>
            <small className="text-muted">객체 상태를 추가할 수 있습니다. </small>
        </form>
    );
};