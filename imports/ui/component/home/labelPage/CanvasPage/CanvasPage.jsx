import React, {useEffect, useState} from "react";
import styles from "./CanvasPage.module.css";
import Editor from "../Editor";

export default function CanvasPage() {
  return (
    <div className={styles.pageWrap}>
      <Editor image={undefined}/>
    </div>
  );
}
