import { Button, Highlight, Image, PasswordInput, Text, TextInput } from '@mantine/core'
import { projectCollection } from 'imports/db/collections'
import { userProfileCollection } from 'imports/db/collections'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import NavigationBar from '../../../../components/NavigationBar/NavigationBar'
import ProjectDetail from './ProjectDetail/ProjectDetail'
import styles from './ProjectList2.module.css'

export default function ProjectList2() {
  const user = useTracker(() => Meteor.user())
  const projectList = useTracker(() => projectCollection.find({}).fetch())
  const userList = useTracker(() => userProfileCollection.find({}).fetch())
  const [IsThereAdmin, setIsThereAdmin] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null)
  const [toggleCurrentProjectDetail, setToggleCurrentProjectDetail] = useState(false)

  useEffect(() => {
    let id = user?.username
    let i
    if (id && IsThereAdmin === false) {
      for (i = 0; i < userList.length; i++) {
        if (id === userList[i].userName && userList[i].rank === 'admin') {
          setIsThereAdmin(true)
        }
      }
    }
  }, [user])

  // console.log(projectList)
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.topMenu}>
          <Button
            className={styles.topMenuButton}
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
            component={Link}
            to="/projectManagementPage"
          >
            프로젝트 관리
          </Button>
          <Button
            className={styles.topMenuButton}
            variant="gradient"
            gradient={{ from: 'grape', to: 'pink', deg: 35 }}
            component={Link}
            to="/userControlPage"
          >
            계정 관리
          </Button>
        </div>

        <div className={styles.projectList}>
          <div className={styles.listHead}>
            <div className={styles.listHeadTitle}>NO</div>
            <div className={styles.listHeadTitle}>PROJECT NAME</div>
            <div className={styles.listHeadTitle}>OPTION</div>
          </div>
          <div className={styles.listContents}>
            <div className={styles.listContentsWrap}>
              {projectList
                ? projectList.map((e, idx) => (
                    <div key={e.projectId} className={styles.listContent}>
                      <div>{idx + 1}</div>
                      <div className={styles.projectName}>{e.projectName}</div>
                      <div className={styles.contentOptions}>
                        <Button
                          variant="link"
                          color="gray"
                          component={Link}
                          leftIcon={<i className="fas fa-sign-in-alt"></i>}
                          to={{
                            pathname: '/labelingPage',
                            search: `?projectName=${e.projectName}`,
                          }}
                          size="lg"
                        ></Button>
                        <Button
                          variant="link"
                          color="grape"
                          leftIcon={<i className="fas fa-info-circle"></i>}
                          size="lg"
                          onClick={() => {
                            setSelectedProject(e)
                            setToggleCurrentProjectDetail(true)
                          }}
                        ></Button>
                      </div>
                    </div>
                  ))
                : ''}
            </div>
          </div>
        </div>
      </div>
      <NavigationBar />
      <ProjectDetail
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        toggleCurrentProjectDetail={toggleCurrentProjectDetail}
        setToggleCurrentProjectDetail={setToggleCurrentProjectDetail}
      />
    </main>
  )
}
