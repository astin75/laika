import React from 'react'
import styles from './ProjectList.module.css'

export default function ProjectList({ project }) {
  return (
    <div className={styles.projectListWrap}>
      {project.map((contents) => (
        <div className={styles.projectList}>{contents}</div>
      ))}
    </div>
  )
}
