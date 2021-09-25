import React, { useState } from 'react';

import styles from './PolygonInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { annotationDispatcherState, currentAnnotations, selectionIdx } from 'imports/recoil/annotation';
import _ from 'lodash';

export default function PolygonInfor({ objectColorValues }) {
  const [polygonInfor, setPolygonInfor] = useState({
    class: '',
    visible: true,
    color: '#25262b',
    number: '',
    polygonPallteConfig: false,
  });

  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);
  const [selection, setSelection] = useRecoilState(selectionIdx);

  const polygonClassInfor = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'rabbit', label: 'Rabbit' },
  ];

  return (
    <div className={styles.polygonInforWrap}>
      {polygonInfor.visible === true ? (
        <div
          onClick={() => {
            setPolygonInfor((pre) => ({ ...pre, visible: false }));
            const newAnnot = _.cloneDeep(annotations[selection]);
            newAnnot.regions.polygon.visible = false;
            annotationDispatcher?.edit(selection, newAnnot, false);
          }}
        >
          <i className="far fa-eye"></i>
        </div>
      ) : (
        <div
          onClick={() => {
            setPolygonInfor((pre) => ({ ...pre, visible: true }));
            const newAnnot = _.cloneDeep(annotations[selection]);
            newAnnot.regions.polygon.visible = true;
            annotationDispatcher?.edit(selection, newAnnot, false);
          }}
        >
          <i className="far fa-eye-slash"></i>
        </div>
      )}
      <div>Polygon</div>
      <div
        className={styles.polygonInforColor}
        style={{ backgroundColor: `${polygonInfor.color}` }}
        onClick={() => {
          setPolygonInfor((pre) => ({
            ...pre,
            polygonPallteConfig: !polygonInfor.polygonPallteConfig,
          }));
        }}
      >
        <div
          className={styles.polygonColorSelect}
          style={{ display: polygonInfor.polygonPallteConfig ? 'block' : 'none' }}
        >
          <ColorPicker
            size="xs"
            withPicker={false}
            value={polygonInfor.color}
            onChange={(e) => {
              setPolygonInfor((pre) => ({ ...pre, color: e, polygonInfor: false }));
            }}
            swatches={objectColorValues}
          />
        </div>
      </div>

      {/*<Select*/}
      {/*  size="xs"*/}
      {/*  data={polygonClassInfor}*/}
      {/*  onChange={(e) => {*/}
      {/*    setPolygonInfor((pre) => ({ ...pre, class: e }));*/}
      {/*  }}*/}
      {/*  style={{ width: '80px' }}*/}
      {/*/>*/}
    </div>
  );
}
