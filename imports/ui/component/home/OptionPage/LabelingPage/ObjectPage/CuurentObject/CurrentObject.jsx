import React, { useEffect, useState } from "react";
import styles from "./CurrentObject.module.css";
import { Icon } from "@iconify/react";

function CurrentObjectOptions() {
  const [currentDrawOption, setCurrentDrawOption] = useState("");

  // useEffect(() => {
  //   console.log(currentDrawOption);
  // }, [currentDrawOption]);

  return (
    <div className={styles.currentObjectOptionsWrap}>
      <Icon
        icon="akar-icons:square"
        style={{
          width: "20px",
          height: "20px",
          color: currentDrawOption === "bBox" ? "#000000" : "#ffffff",
        }}
        onClick={() => {
          setCurrentDrawOption("bBox");
        }}
      />
      <Icon
        icon="akar-icons:dot-grid"
        style={{
          width: "20px",
          height: "20px",
          color: currentDrawOption === "ketPoint" ? "#000000" : "#ffffff",
        }}
        onClick={() => {
          setCurrentDrawOption("ketPoint");
        }}
      />
      <Icon
        icon="bx:bx-shape-polygon"
        style={{
          width: "20px",
          height: "20px",
          color: currentDrawOption === "polygon" ? "#000000" : "#ffffff",
        }}
        onClick={() => {
          setCurrentDrawOption("polygon");
        }}
      />
    </div>
  );
}

function CurrentObjectInfor({ currentObject }) {
  const [state1, setState1] = useState("");
  const [state2, setState2] = useState("");
  const [objectTrakingValue, setObjectTrakingValue] = useState(0);
  const [currentObjectTrakingValue, setCurrentObjectTrakingValue] = useState(0);

  const state1Options = ["car", "person", "cat"];
  const state2Options = ["run", "sit", "stop"];

  const selectState1 = (e) => {
    setState1(e.target.value);
  };
  const selectState2 = (e) => {
    setState2(e.target.value);
  };

  const selectObjectTrakingValue = (e) => {
    setObjectTrakingValue(e.target.value);
  };

  const selectCurrentObjectTrakingValue = () => {
    setCurrentObjectTrakingValue(objectTrakingValue);
  };

  return (
    <div className={styles.currentObjectInforWrap}>
      <div>
        bBox : [{currentObject.bBox[0]},{currentObject.bBox[1]},
        {currentObject.bBox[2]},{currentObject.bBox[3]}]
      </div>

      <div>
        keyPoint :{" "}
        {currentObject.keyPoint.map((e) => (
          <span key={String(e[0] + e[1] + e[2])}>
            [{e[0]},{e[1]},{e[2]}]
          </span>
        ))}{" "}
      </div>
      <div>
        Polygon :{" "}
        {currentObject.polygon.map((e) => (
          <span key={String(e[0] + e[1])}>
            [{e[0]},{e[1]}]
          </span>
        ))}{" "}
      </div>
      <div className={styles.selectStateWrap}>
        <div>state1 : {state1}</div>
        <div>
          <select className="w150" onChange={selectState1} value={state1}>
            {state1Options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.selectStateWrap}>
        <div>state2 : {state2}</div>
        <div>
          <select className="w150" onChange={selectState2} value={state2}>
            {state2Options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
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
  );
}

export default function CurrentObject({ currentObject }) {
  return (
    <div className={styles.pageWrap}>
      <div className={styles.selectedObject}>
        Selected Object
        {currentObject ? `[Object ${currentObject.objectNo}]` : ""}
      </div>
      <CurrentObjectOptions />
      {currentObject ? (
        <CurrentObjectInfor currentObject={currentObject} />
      ) : (
        ""
      )}
    </div>
  );
}
