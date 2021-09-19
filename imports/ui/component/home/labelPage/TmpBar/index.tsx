import React, { useState } from 'react';
import styles from './TmpBar.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  annotationDispatcherState,
  currentAnnotations,
  selectionIdx,
} from '../../../../../recoil/annotation';
import { EditorMode } from '../Editor';
import classNames from 'classnames';

interface ITmpBar {
  mode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
}

export default function TmpBar({ mode, onModeChange }: ITmpBar) {
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);

  const [selection, setSelection] = useRecoilState(selectionIdx);

  const insertObject = () => {
    annotationDispatcher?.insert();
  };

  return (
    <div className={styles.bar}>
      <section className={styles.buttons}>
        <button onClick={insertObject}>Add</button>
        <button
          className={classNames(
            mode === EditorMode.Rect ? styles.button_active : ''
          )}
          onClick={() => {
            if (mode == EditorMode.Rect) onModeChange(EditorMode.Idle);
            else onModeChange(EditorMode.Rect);
          }}>
          Box
        </button>
        <button
          className={classNames(
            mode === EditorMode.Skeleton ? styles.button_active : ''
          )}
          onClick={() => {
            if (mode == EditorMode.Skeleton) onModeChange(EditorMode.Idle);
            else onModeChange(EditorMode.Skeleton);
          }}>
          Skel.
        </button>
        <button
          className={classNames(
            mode === EditorMode.Polygon ? styles.button_active : ''
          )}
          onClick={() => {
            if (mode == EditorMode.Polygon) onModeChange(EditorMode.Idle);
            else onModeChange(EditorMode.Polygon);
          }}>
          Polygon
        </button>
      </section>
      <div className={styles.label_table}>
        {annotations.map((annot, idx) => {
          return (
            <div
              className={classNames(idx === selection ? styles.selected : '')}
              key={annot.key}
              onClick={() => setSelection(idx)}>
              {annot.className}
            </div>
          );
        })}
      </div>
      {/*어노테이션 정보*/}
      {selection !== undefined ? (
        <div>
          <h3>Idx: {selection}</h3>
          {annotations[selection].regions.rect ? (
            <div>
              <h3>Rect</h3>
              <h4>area</h4>
              <p>{annotations[selection].regions.rect.area}</p>
              <h4>loc</h4>
              <p> x: {annotations[selection].regions.rect.x}</p>
              <p> y: {annotations[selection].regions.rect.y}</p>
              <p> w: {annotations[selection].regions.rect.width}</p>
              <p> h: {annotations[selection].regions.rect.height}</p>
            </div>
          ) : (
            <></>
          )}
          {annotations[selection].regions.polygon ? (
            <div>
              <h3>Polygon</h3>
              <h4>area</h4>
              <p>{annotations[selection].regions.polygon.area}</p>
              <h4>loc</h4>
              {annotations[selection].regions.polygon.points.map(
                (point, idx) => {
                  return (
                    <p key={`${annotations[selection].key}_${idx}`}>
                      x: {point.x}, y:{point.y}
                    </p>
                  );
                }
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
