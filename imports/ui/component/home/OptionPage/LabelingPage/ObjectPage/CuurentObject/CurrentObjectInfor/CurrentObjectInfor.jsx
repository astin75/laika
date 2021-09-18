import React, { useState } from 'react'

import styles from './CurrentObjectInfor.module.css'

export default function CurrentObjectInfor({ currentObject, currentProjectInfo }) {
  const [state1, setState1] = useState('')
  const [state2, setState2] = useState('')
  const [bBoxClass, setbBoxClass] = useState('')
  const [polygonClass, setPolygonClass] = useState('')
  const [objectTrakingValue, setObjectTrakingValue] = useState(0)
  const [currentObjectTrakingValue, setCurrentObjectTrakingValue] = useState(0)

  const state1Options = ['car', 'person', 'cat']
  const state2Options = ['run', 'sit', 'stop']

  const selectState1 = (e) => {
    setState1(e.target.value)
  }
  const selectState2 = (e) => {
    setState2(e.target.value)
  }
  const selectbBoxClass = (e) => {
    setbBoxClass(e.target.value)
  }
  const selectPolygonClass = (e) => {
    setPolygonClass(e.target.value)
  }

  const selectObjectTrakingValue = (e) => {
    setObjectTrakingValue(e.target.value)
  }

  const selectCurrentObjectTrakingValue = () => {
    setCurrentObjectTrakingValue(objectTrakingValue)
  }

  // console.log(currentProjectInfo.stateList.stateList[0].action1);
  // console.log(currentProjectInfo.stateList.stateList[0]);
  // console.log(currentProjectInfo.stateList.stateList.length);
  console.log(currentProjectInfo)

  return (
    <div className={styles.currentObjectInforWrap}>
      <div className={styles.bBoxWrap}>
        <div>
          bBox : [{currentObject.bBox[0]},{currentObject.bBox[1]},{currentObject.bBox[2]},
          {currentObject.bBox[3]}]
        </div>
        <div>
          <select className="w150" onChange={selectbBoxClass} value={bBoxClass}>
            {currentProjectInfo !== null && currentProjectInfo.bbox.List.length > 0
              ? currentProjectInfo.bbox.List.map((e) => (
                  <option value={e.className}>{e.className}</option>
                ))
              : ''}
          </select>
        </div>
      </div>

      <div>
        <div>
          keyPoint :
          {currentObject.keyPoint.map((e) => (
            <span key={String(e[0] + e[1] + e[2])}>
              [{e[0]},{e[1]},{e[2]}]
            </span>
          ))}
        </div>
      </div>
      <div className={styles.bBoxWrap}>
        <div>
          Polygon :{' '}
          {currentObject.polygon.map((e) => (
            <span key={String(e[0] + e[1])}>
              [{e[0]},{e[1]}]
            </span>
          ))}{' '}
        </div>
        <div>
          <select className="w150" onChange={selectPolygonClass} value={polygonClass}>
            {currentProjectInfo !== null && currentProjectInfo.bbox.List.length > 0
              ? currentProjectInfo.bbox.List.map((e) => (
                  <option value={e.className}>{e.className}</option>
                ))
              : ''}
          </select>
        </div>
      </div>
      <div className={styles.selectStateWrap}>
        <div>state1 : {state1}</div>
        <div>
          <select className="w150" onChange={selectState1} value={state1}>
            {currentProjectInfo !== null && currentProjectInfo.stateList.stateList.length > 0 ? (
              <>
                <option value={currentProjectInfo.stateList.stateList[0].action1}>
                  {currentProjectInfo.stateList.stateList[0].action1}
                </option>
                <option value={currentProjectInfo.stateList.stateList[0].action2}>
                  {currentProjectInfo.stateList.stateList[0].action2}
                </option>
              </>
            ) : (
              ''
            )}
            {/* {state1Options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))} */}
          </select>
        </div>
      </div>
      <div className={styles.selectStateWrap}>
        <div>state2 : {state2}</div>
        <div>
          <select className="w150" onChange={selectState2} value={state2}>
            {currentProjectInfo !== null && currentProjectInfo.stateList.stateList.length > 1 ? (
              <>
                <option value={currentProjectInfo.stateList.stateList[1].action1}>
                  {currentProjectInfo.stateList.stateList[1].action1}
                </option>
                <option value={currentProjectInfo.stateList.stateList[1].action2}>
                  {currentProjectInfo.stateList.stateList[1].action2}
                </option>
              </>
            ) : (
              ''
            )}
            {/* {state2Options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))} */}
          </select>
        </div>
      </div>
      <div className={styles.selectObjectTrackingWrap}>
        <div>object tracking : {currentObjectTrakingValue}</div>
        <div className={styles.selectObjectTrackingValue}>
          <input onChange={selectObjectTrakingValue} />
          <div onClick={selectCurrentObjectTrakingValue}>입력</div>
        </div>
      </div>
    </div>
  )
}
