import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data'
import styles from './ProjectList2.module.css'
import { Meteor } from 'meteor/meteor'
import { projectCollection } from 'imports/db/collections'

import { TextInput, Button, PasswordInput, Image, Text, Highlight } from '@mantine/core'
import NavigationBar from '../../../../components/NavigationBar/NavigationBar'

export default function ProjectList2() {
  const user = useTracker(() => Meteor.user())
  const projectList = useTracker(() => projectCollection.find({}).fetch())
  const [IsThereAdmin, setIsThereAdmin] = useState(false)

  const onDelete = (project) => {
    let oops = projectCollection.find({ projectName: project.projectName }).fetch()
    projectCollection.remove(oops[0]._id)
  }

  useEffect(() => {
    if (user !== null) {
      if (user.profile['rank'] === 'admin') {
        setIsThereAdmin(true)
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
            gradient={{ from: 'indigo', to: 'cyan' }}
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
            to="/projectManagementPage"
          >
            계정 관리
          </Button>
        </div>

        <div className={styles.projectList}>
          <div className={styles.listHead}>
            <div>NO</div>
            <div>PROJECT NAME</div>
            <div>OPTION</div>
          </div>
          {projectList
            ? projectList.map((e) => (
                <div key={e.projectId} className={styles.listContents}>
                  <div>{e.projectId}</div>
                  <div>{e.projectName}</div>
                  <div className={styles.contentOptions}>
                    <Button
                      variant="link"
                      color="lime"
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
                      color="teal"
                      leftIcon={<i className="fas fa-info-circle"></i>}
                      size="lg"
                    ></Button>
                  </div>
                </div>
              ))
            : ''}
        </div>
        {/* <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">프로젝트 이름</th>
              <th scope="col">Column heading</th>
              <th scope="col">Column heading</th>
            </tr>
          </thead>
          <tbody>
            {projectList ? (
              projectList.map((x) => (
                <tr className="table-active">
                  <th scope="row"></th>
                  <td>{x.projectName}</td>
                  <td>
                    {x.totalUnConfirmSize} / {x.totalFileSize}
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname: '/labelingPage',
                        search: `?projectName=${x.projectName}`,
                      }}
                    >
                      이동하기
                    </Link>
                    {IsThereAdmin ? (
                      <button type="submit" className="btn btn-danger" onClick={() => onDelete(x)}>
                        삭제하기
                      </button>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table> */}
      </div>
      <NavigationBar />
    </main>
  )
}
