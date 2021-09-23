import React, { useEffect, useState } from 'react';
import styles from './Objects.module.css';
import { Icon } from '@iconify/react';
import { useTracker } from 'meteor/react-meteor-data';

import { imageInfoCollection } from 'imports/db/collections';
import { gtInfoCollection } from 'imports/db/collections';

export default function Objects({ setCurrentObject, currentImageInfo }) {
  const imageList = useTracker(() => imageInfoCollection.find().fetch());
  const gtList = useTracker(() => gtInfoCollection.find().fetch());

  const deleteObejctbtn = (currentObjectId) => {
    imageInfoCollection.update(
      { _id: currentImageInfo._id },
      { $pull: { object: { objectId: currentObjectId } } }
    );
  };

  // console.log(imageList, gtList)

  return (
    <div className={styles.pageWrap}>
      {/* {imageList !== null && currentImageInfo !== null
        ? imageList
            .find((e) => e._id === currentImageInfo._id)
            .object.map((object) => (
              <div key={object.objectId} className={styles.object}>
                <div className={styles.objectTitle} onClick={() => setCurrentObject(object)}>
                  object {object.objectId}
                </div>
                <Icon icon="bi:trash" onClick={() => deleteObejctbtn(object.objectId)} />
              </div>
            ))
        : ''} */}
    </div>
  );
}
