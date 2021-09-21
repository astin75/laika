import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProjectDetail.module.css'
import dayjs from 'dayjs'
import { Button, MultiSelect, Progress } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'

import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { projectCollection } from 'imports/db/collections'
// import { projectCollection } from 'imports/db/collections'

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
  const user = useTracker(() => Meteor.users.find({}).fetch())
  const [value, setValue] = useState([[], []])
  const projectList = useTracker(() => projectCollection.find({}).fetch())

  const userData = ['peter1', 'peter3']
  const [selectedUsers, setSelectedUsers] = useState([])
  if (user) {
    user.map((e) => userData.push(e.username))
  }

  const updateProjectDetail = () => {
    if (value[0] === null || value[1] === null) {
      alert('프로젝트 일정이 선택되지 않았습니다')
      return
    } else if (value[0].length === 0 || value[1].length === 0) {
      alert('프로젝트 일정이 선택되지 않았습니다')
      return
    } else if (selectedUsers.length === 0) {
      alert('작업자를 지정하지 않았습니다')
      return
    }

    projectCollection.update(
      { _id: selectedProject._id },
      {
        $set: {
          startDate: `${value[0].getFullYear()}-${value[0].getMonth()}-${value[0].getDate()}`,
          endDate: `${value[1].getFullYear()}-${value[1].getMonth()}-${value[1].getDate()}`,
          workers: selectedUsers,
        },
      }
    )
  }

  const deleteProject = () => {
    // console.log('Deleting the world...')
    const currentProject = projectCollection
      .find({ projectName: selectedProject.projectName })
      .fetch()
    projectCollection.remove(currentProject[0]._id)
    setSelectedProject(null)
  }
  const abort = () => {
    return
  }
  const confirmDelete = useConfirm('프로젝트를 삭제하시겠습니까? ', deleteProject, abort)

  return (
    <div
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
                ((selectedProject.totalFileSize.length -
                  (selectedProject.totalFileSize.length - selectedProject.totalUnConfirmSize)) /
                  selectedProject.totalFileSize.length) *
                100
              }
            />
          </div>
          <div className={styles.projectDetails}>
            <div className={styles.detailTitle}>Project Member </div>
            {user ? (
              <MultiSelect
                data={userData}
                placeholder="Pick members on this Project"
                onChange={(e) => setSelectedUsers(e)}
              />
            ) : (
              ''
            )}
          </div>
          <div className={styles.projectOptions}>
            <Button
              variant="link"
              color="gray"
              leftIcon={<i className="fas fa-save"></i>}
              size="lg"
              onClick={updateProjectDetail}
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
              onClick={confirmDelete}
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
    </div>
  )
}
