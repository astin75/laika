import React from 'react';
import styles from './TmpBar.module.css';
import {useRecoilValue} from 'recoil';
import {annotationDispatcherState, currentAnnotations} from '../../../../../recoil/annotation';
import {makeRectRegion} from '../../../../../canvasTools/IRect';

interface ITmpBar {
  onModeClick: () => void;
}

export default function TmpBar({onModeClick}: ITmpBar) {
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);

  const insertObject = () => {
    annotationDispatcher?.insert();
  };

  const onBoxClick = (e: React.MouseEvent) => {
    e.target.classList.toggle('active');
  };

  return (<div className={styles.bar}>
    <section className={styles.buttons}>
      <button className={styles.button} onClick={insertObject}>Add</button>
      <button className={styles.button} onClick={onBoxClick}>Box</button>
      <button className={styles.button}>Skel.</button>
      <button className={styles.button}>Poly.</button>
    </section>
    <div className={styles.label_table}>
      {annotations.map((annot) => {
        return <p key={annot.key}>
          {annot.className}
        </p>;
      })}
    </div>
  </div>);
};