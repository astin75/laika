import React, { useEffect, useState } from 'react';
import styles from './Objects.module.css';
import { Icon } from '@iconify/react';
import { useTracker } from 'meteor/react-meteor-data';

import { imageInfoCollection } from 'imports/db/collections';
import { gtInfoCollection } from 'imports/db/collections';

export default function Objects({ objects, setCurrentObject, setObjects, currentImageInfo }) {
  const deleteObejctbtn = (currentObjectId) => {
    setObjects(objects.filter((e) => e.objectId !== currentObjectId));
  };

  return (
    <div className={styles.pageWrap}>
      {currentImageInfo !== null
        ? objects.map((object, idx) => (
            <div key={object.objectId} className={styles.object}>
              <div className={styles.objectTitle} onClick={() => setCurrentObject(object)}>
                object {object.objectId}
              </div>
              <Icon icon="bi:trash" onClick={() => deleteObejctbtn(object.objectId)} />
            </div>
          ))
        : ''}
    </div>
  );
}
