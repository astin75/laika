import React, { useEffect, useState } from 'react'
import styles from './ProjectDetail.module.css'
import dayjs from 'dayjs'
import { Button, MultiSelect, Progress } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'

const data = [
  { value: 'react', label: 'React' },
  { value: 'ng', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
  { value: 'riot', label: 'Riot' },
  { value: 'next', label: 'Next.js' },
  { value: 'blitz', label: 'Blitz.js' },
]

export default function ProjectDetail({ selectedProject }) {
  console.log(selectedProject)

  const [value, setValue] = useState([
    dayjs(new Date()).startOf('month').toDate(),
    dayjs(new Date()).startOf('month').add(4, 'days').toDate(),
  ])

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img></img>
      </div>
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
        <div className={styles.projectName}>
          <div>Project Name :</div> {selectedProject.projectName}{' '}
        </div>
        <DateRangePicker
          label="Project Schedule"
          placeholder="Pick dates range"
          value={value}
          onChange={setValue}
        />
        <div>
          <div>Project Progress : </div>
          <Progress
            value={
              (selectedProject.totalFileSize.length - selectedProject.totalUnConfirmSize) / 100
            }
          />
        </div>
        <div>
          <MultiSelect
            label="Select member on Project"
            data={data}
            placeholder="Pick all that you like"
          />
        </div>
        <div className={styles.projectOptions}>
          <Button
            variant="link"
            color="dark"
            leftIcon={<i className="fas fa-save"></i>}
            size="lg"
          ></Button>
          <Button
            variant="link"
            color="dark"
            leftIcon={<i className="fas fa-sign-in-alt"></i>}
            size="lg"
          ></Button>
          <Button
            variant="link"
            color="dark"
            leftIcon={<i className="fas fa-trash"></i>}
            size="lg"
          ></Button>
        </div>
      </div>
      <div className={styles.exitBtn}>
        <div className={styles.exitBtnLeftBar}></div>
        <div className={styles.exitBtnRightBar}></div>
      </div>
    </div>
  )
}
