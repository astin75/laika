import React, { useEffect, useState } from "react";
import styles from "./Objects.module.css";

export default function Objects() {
  const objects = ["object1", "object2", "object3", "object4", "object5"];

  return (
    <div className={styles.pageWrap}>
      {objects.map((e) => (
        <div key={e} className={styles.object}>
          {e}
        </div>
      ))}
    </div>
  );
}
