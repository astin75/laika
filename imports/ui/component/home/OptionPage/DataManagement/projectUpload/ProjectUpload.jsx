import React, {useState} from 'react';
import AddState from "./addState/AddState";
import AddImages from "./addImages/AddImages";
import StateList from "./StateList/StateList";
import BoundingBoxConfig from "./BoundingBoxConfig/BoundingBoxConfig";
import KeypointConfig from "./KeypointConfig/KeypointConfig";
import styles from './ProjectUpload.module.css'

export default function ProjectUpload() {
    const [ObjectStateBox, setObjectStateBox] = useState({stateList: []})


    const stateAdd = (stateName, action1, action2) => {

        if (ObjectStateBox.stateList.length === 0) {
            let stateList = [{id: Date.now(), stateName: stateName, action1: action1, action2: action2}]
            setObjectStateBox({stateList})
        }
        else if (ObjectStateBox.stateList.length > 1){
            alert("최대 2개 추가 가능합니다.")

        }
        else {
            let stateList = [...ObjectStateBox.stateList,
                {id: Date.now(), stateName: stateName, action1: action1, action2: action2}]
            setObjectStateBox({stateList})
        }

        console.log(ObjectStateBox)
    }

    const stateEdit = (stateName, action1, action2) => {
        let stateList = [...ObjectStateBox.stateList]
        const index = stateList.indexOf(stateName)
        stateList[index].action1 = action1
        stateList[index].action2 = action2
        setObjectStateBox({stateList})


    }



    return (
        <div>
            <form>
                <div className="form-group">
                    <label>Project Name</label>
                    <input className="form-control" placeholder=""/>
                    <small className="form-text text-muted">프로젝트이름을 입력해주세요.</small>
                </div>
                <BoundingBoxConfig/>
                <KeypointConfig/>


                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label>Polygon</label>
                        <select defaultValue="false" className="form-control">
                            <option>true</option>
                            <option>false</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label>Object ID</label>
                        <select defaultValue="false" className="form-control">
                            <option>true</option>
                            <option>false</option>
                        </select>
                    </div>

                </div>
                {ObjectStateBox.stateList.length > 0 ? (
                        <StateList stateEdit={stateEdit} ObjectStateBox={ObjectStateBox}/>) :
                    (<div></div>)}

                <AddImages/>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"> Register</button>
                </div>
                <br/>

            </form>
            <AddState stateAdd={stateAdd}/>


        </div>
    );
};