import React, { useEffect, useState } from 'react'
import styles from './OptionPage.module.css'
import { useTracker } from 'meteor/react-meteor-data'
import ProjectUpload from './projectUpload/ProjectUpload'

export const OptionPage = () => {
  const user = useTracker(() => Meteor.user())
  const [IsThereAdmin, setIsThereAdmin] = useState(false)

  useEffect(() => {
    if (user !== undefined) {
      if (user.profile['rank'] === 'admin') {
        setIsThereAdmin(true)
      }
    }
  }, [user])

  return (
    <main className={styles.main}>
      {IsThereAdmin ? (
        <ProjectUpload />
      ) : (
        <a>
          <img src={'lockDataManagement.png'} />
        </a>
      )}
    </main>
  )
}
