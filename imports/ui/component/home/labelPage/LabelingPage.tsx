import React, {useEffect, useState} from 'react';

import ImageFilesPage from './ImageFilesPage/ImageFilesPage';
import ObjectPage from './ObjectPage/ObjectPage';
import HeaderPage from './HeaderPage/HeaderPage';

import styles from './LabelingPage.module.css';
import Editor from './Editor';

export default function LabelingPage() {
  const [image, setImage] = useState<HTMLImageElement>(undefined);
  useEffect(() => {
    return () => {
      const img = new Image();
      img.src = '/poster.jpg';
      img.onload = () => {
        console.log('load');
        setImage(img);
      };
    };
  }, []);


  return (
    <div className={styles.main}>
      <HeaderPage/>
      <div className={styles.contents}>
        <ImageFilesPage/>
        <Editor image={image}/>
        {/* <CanvasPage /> */}
        <ObjectPage/>
      </div>
    </div>
  );
}
