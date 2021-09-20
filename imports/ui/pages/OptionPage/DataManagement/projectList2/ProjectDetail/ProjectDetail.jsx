import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProjectDetail.module.css'
import dayjs from 'dayjs'
import { Button, MultiSelect, Progress } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'

import { useTracker } from 'meteor/react-meteor-data'
import { projectCollection } from 'imports/db/collections'

import { useSpring, animated } from 'react-spring'
// import testImg from 'GameLogo.png'

const data = [
  { value: 'react', label: 'React' },
  { value: 'ng', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
  { value: 'riot', label: 'Riot' },
  { value: 'next', label: 'Next.js' },
  { value: 'blitz', label: 'Blitz.js' },
]

const useConfirm = (message = '', onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== 'function') {
    return
  }
  if (onCancel && typeof onCancel !== 'function') {
    return
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm()
    } else {
      onCancel()
    }
  }
  return confirmAction
}

export default function ProjectDetail({
  selectedProject,
  setSelectedProject,
  toggleCurrentProjectDetail,
  setToggleCurrentProjectDetail,
}) {
  // console.log(selectedProject);

  const projectList = useTracker(() => projectCollection.find({}).fetch())
  const deleteWorld = () => {
    console.log('Deleting the world...')
    const currentProject = projectCollection
      .find({ projectName: selectedProject.projectName })
      .fetch()
    projectCollection.remove(currentProject[0]._id)
    setSelectedProject(null)
  }
  const abort = () => console.log('Aborted')
  const confirmDelete = useConfirm('Are you sure', deleteWorld, abort)

  const onDelete = (project) => {
    confirmDelete()
  }

  const [value, setValue] = useState([
    dayjs(new Date()).startOf('month').toDate(),
    dayjs(new Date()).startOf('month').add(4, 'days').toDate(),
  ])

  return (
    <animated.div
      style={{
        opacity: toggleCurrentProjectDetail ? 1 : 0,
        width: toggleCurrentProjectDetail ? '20%' : '0',
        transition: toggleCurrentProjectDetail
          ? 'opacity 1300ms, width 300ms'
          : 'opacity 300ms, width 300ms',
      }}
      className={styles.container}
    >
      <div className={styles.top}>
        <img src={'GameLogo.png'}></img>
      </div>
      {selectedProject ? (
        <div className={styles.bottom}>
          <div className={styles.selectedObjects}>
            {selectedProject.bbox.length > 0 ? (
              <Button color="grape" radius="xl" size="xs">
                bBox
              </Button>
            ) : (
              ''
            )}
            {selectedProject.keypoint.length > 0 ? (
              <Button color="orange" radius="xl" size="xs">
                keyPoint
              </Button>
            ) : (
              ''
            )}
            {selectedProject.polygon === true ? (
              <Button color="indigo" radius="xl" size="xs">
                polygon
              </Button>
            ) : (
              ''
            )}
          </div>
          <div className={styles.projectDetails}>
            <div className={styles.detailTitle}>Project Name </div>
            <div>{selectedProject.projectName} </div>
          </div>
          <div className={styles.projectDetails}>
            <div className={styles.detailTitle}>Project Schedule </div>
            <DateRangePicker placeholder="Pick dates range" value={value} onChange={setValue} />
          </div>
          <div className={styles.projectDetails}>
            <div className={styles.detailTitle}>Project Progress</div>
            <Progress
              value={
                (selectedProject.totalFileSize.length - selectedProject.totalUnConfirmSize) / 100
              }
            />
          </div>
          <div className={styles.projectDetails}>
            <div className={styles.detailTitle}>Project Member </div>
            <MultiSelect data={data} placeholder="Pick members on this Project" />
          </div>
          <div className={styles.projectOptions}>
            <Button
              variant="link"
              color="gray"
              leftIcon={<i className="fas fa-save"></i>}
              size="lg"
            ></Button>
            <Button
              variant="link"
              component={Link}
              to={{
                pathname: '/labelingPage',
                search: `?projectName=${selectedProject.projectName}`,
              }}
              color="gray"
              leftIcon={<i className="fas fa-sign-in-alt"></i>}
              size="lg"
            ></Button>
            <Button
              variant="link"
              color="gray"
              leftIcon={<i className="fas fa-trash"></i>}
              size="lg"
              onClick={() => onDelete(selectedProject)}
            ></Button>
          </div>
        </div>
      ) : (
        ''
      )}

      <div
        className={styles.exitBtn}
        onClick={() => {
          setSelectedProject(null)
          setToggleCurrentProjectDetail(false)
        }}
      >
        <div className={styles.exitBtnLeftBar}></div>
        <div className={styles.exitBtnRightBar}></div>
      </div>
    </animated.div>
  )
}
