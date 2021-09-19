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

//TODO: 우측 어노테이션바 테스트 용으로 내용 표시합니다. 기존 어노테이션 바에 잘 맞추서 넣으면 됩니다.
// 여기서 클릭해서 선택하거나 삭제하는 어노테이션들은 Recoil로 관리하므로 앱 전체에서 공유할 수 있습니다
export default function TmpBar({ mode, onModeChange }: ITmpBar) {
  const annotationDispatcher = useRecoilValue(annotationDispatcherState); // 어노테이션 데이터 변경 시 사용
  const annotations = useRecoilValue(currentAnnotations); // 현재 어노테이션 리스트

  const [selection, setSelection] = useRecoilState(selectionIdx); // 선택된 어노테이션 인덱스 저장

  const insertObject = () => {
    annotationDispatcher?.insert();
  };

  const deleteObject = () => {
    annotationDispatcher?.del(); // 선택된 어노테이션들 전체 삭제. 여기서는 하나만 선택하므로 하나만 삭제됨
    setSelection(undefined);
  };

  return (
    <div className={styles.bar}>
      <section className={styles.buttons}>
        {/* 어노테이션 추가하거나 삭제하는 버튼 */}
        <button onClick={insertObject}>Add</button>
        <button onClick={deleteObject}>Del </button>
        {/* 새 어노테이션 시작하는 버튼. Add -> 리스트에서 클릭 -> Rect, Skeleton(아직안함), Polygon 버튼 눌러서 작업 모드로 들어감 */}
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
      {/* 어노테이션 리스트 표시. 클릭하면 선택됨 */}
      <div className={styles.label_table}>
        {annotations.map((annot, idx) => {
          return (
            <div
              className={classNames(idx === selection ? styles.selected : '')}
              key={annot.key}
              onClick={() => {
                // 이전 객체는 Selected를 False로 바꾸고 새로 클릭한 놈을 True 로 바꿈
                annotationDispatcher?.setSelectionAnnotation(selection, false);
                annotationDispatcher?.setSelectionAnnotation(idx, true);
                // 새로 클릭한 놈 idx 저장
                setSelection(idx);
              }}>
              {annot.className}
            </div>
          );
        })}
      </div>
      {/*어노테이션 상세 정보 표시하는 부분*/}
      {selection !== undefined ? (
        <div>
          <h3>Idx: {selection}</h3>
          {/* annot.region에 rect, skeleton, polygon 등 좌표 정보가 저장됨. 라벨링 안된 상태면 undefined 임 */}
          {annotations[selection].regions.rect ? (
            <div>
              <h3>Rect</h3>
              <h4>area</h4>
              {/* 대충 박스 정보 */}
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
          {/* 폴리곤 정보들 */}
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
