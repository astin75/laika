import React, { useEffect, useState } from 'react'

import ImageFilesPage from './ImageFilesPage/ImageFilesPage'
import CanvasPage from './CanvasPage/CanvasPage'
import ObjectPage from './ObjectPage/ObjectPage'
import HeaderPage from './HeaderPage/HeaderPage'

import styles from './LabelingPage.module.css'

import queryString from 'query-string'
import { useTracker } from 'meteor/react-meteor-data'
import { imageInfoCollection } from 'imports/db/collections'
import { gtInfoCollection } from 'imports/db/collections'

import { projectCollection } from 'imports/db/collections'

export default function LabelingPage() {
  const query = queryString.parse(location.search)
  const projectList = useTracker(() => projectCollection.find({}).fetch())
  const gtinfor = useTracker(() => imageInfoCollection.find({}).fetch())
  const imageList = useTracker(() => imageInfoCollection.find({}).fetch())

  const [currentProjectInfo, setCurrentProjectInfo] = useState(null)
  const [currentImagesInfo, setCurrentImagesInfo] = useState(null)
  const [currentImageInfo, setCurrentImageInfo] = useState(null)
  const [currentGtInfo, setCurrentGtInfo] = useState(null)

  // console.log(projectList)

  useEffect(() => {
    if (projectList.length !== 0) {
      let currentProjectInfortmp
      currentProjectInfortmp = projectList.find((e) => e.projectName === query.projectName)
      if (currentProjectInfo === null) setCurrentProjectInfo(currentProjectInfortmp)
    }
  }, [projectList])

  useEffect(() => {
    if (currentProjectInfo !== null) {
      let currentImagesInfoTmp
      currentImagesInfoTmp = imageList.filter((e) => e.projectName === query.projectName)
      if (currentImagesInfo === null) setCurrentImagesInfo(currentImagesInfoTmp)

      let currentGtInfoTmp
      currentGtInfoTmp = gtinfor.filter((e) => e.projectName === query.projectName)
      if (currentGtInfo === null) setCurrentGtInfo(currentImagesInfoTmp)
    }
  }, [currentProjectInfo])

  return (
    <div className={styles.main}>
      <HeaderPage />
      <div className={styles.contents}>
        <ImageFilesPage
          currentImagesInfo={currentImagesInfo}
          setCurrentImageInfo={setCurrentImageInfo}
        />
        <CanvasPage />
        <ObjectPage currentProjectInfo={currentProjectInfo} currentImageInfo={currentImageInfo} />
      </div>
    </div>
  )
}
