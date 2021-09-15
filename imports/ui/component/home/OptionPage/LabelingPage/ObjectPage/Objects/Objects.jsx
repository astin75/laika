import React, { useEffect, useState } from "react";
import styles from "./Objects.module.css";

export default function Objects({ setCurrentObject, objects }) {
  // const objects = [
  //   {
  //     bBox: [1, 2, 3, 4], // xmin, ymin, w, h
  //     keyPoint: [
  //       [0, 0, 0],
  //       [0, 0, 0],
  //       [0, 0, 0],
  //       [0, 0, 0],
  //     ], // [x,y,v]
  //     polygon: [
  //       [0, 0],
  //       [0, 0],
  //       [0, 0],
  //       [0, 0],
  //       [0, 0],
  //     ], // [x,y],[x,y],[x,y] ...
  //     state1: "car",
  //     state2: "stop",
  //     objectTracking: 0,
  //   },
  //   {
  //     bBox: [0, 0, 0, 0], // xmin, ymin, w, h
  //     keyPoint: [
  //       [0, 0, 0],
  //       [0, 0, 0],
  //       [0, 0, 0],
  //       [0, 0, 0],
  //     ], // [x,y,v]
  //     polygon: [
  //       [0, 0],
  //       [0, 0],
  //       [0, 0],
  //       [0, 0],
  //       [0, 0],
  //     ], // [x,y],[x,y],[x,y] ...
  //     state1: "car",
  //     state2: "stop",
  //     objectTracking: 1,
  //   },
  // ];

  // objects.map((name, value) => console.log(name));
  return (
    <div className={styles.pageWrap}>
      {objects.map((name, value) => (
        <div
          key={name.objectNo}
          className={styles.object}
          onClick={() => setCurrentObject(name)}
        >
          object {name.objectNo}
        </div>
      ))}
    </div>
  );
}
