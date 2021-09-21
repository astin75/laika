import { Button, Select, Table } from '@mantine/core'
import { userProfileCollection } from 'imports/db/collections'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavigationBar from 'ui/components/NavigationBar/NavigationBar'

// @ts-ignore
import styles from './UserControl.module.css'

export default function UserControl() {
  const userList = useTracker(() => userProfileCollection.find({}).fetch())
  console.log(userList, 'e')

  const [rank, setRank] = useState('')
  const rankOption = [
    { value: 'admin', label: 'admin' },
    { value: 'worker', label: 'worker' },
    { value: 'inspector', label: 'inspector' },
  ]

  const onRankChange = (userName) => {
    if (rank) {
      let oops = userProfileCollection.findOne({ userName: userName })
      userProfileCollection.update(oops._id, { $set: { rank: rank } })
    }
  }

  const onDelete = (userName) => {
    let oops = Meteor.users.findOne({ userName: userName })
    Meteor.users.remove(oops._id)
  }

  const handleChange = (option) => {
    setRank(option)
  }

  return (
    <div className={styles.container}>
      <div className={styles.topMenu}>
        <Button
          className={styles.topMenuButton}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          component={Link}
          to="/projectListPage"
        >
          프로젝트 리스트
        </Button>
        <Button
          className={styles.topMenuButton}
          variant="gradient"
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
          component={Link}
          to="/projectManagementPage"
        >
          프로젝트 등록
        </Button>
      </div>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th align={'right'}>순번</th>
            <th>아이디</th>
            <th>권한 등급</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.userName}</td>
                <td>
                  <Select
                    onChange={(rankOption) => handleChange(rankOption)}
                    className={styles.selectBTN}
                    defaultValue={user.rank}
                    data={rankOption}
                  />
                </td>
                <td>
                  <Button
                    color="teal"
                    size="compact-sm"
                    onClick={() => onRankChange(user.userName)}
                  >
                    적용
                  </Button>
                  &nbsp; / &nbsp;
                  <Button
                    disabled={true}
                    color="red"
                    size="compact-sm"
                    onClick={() => onDelete(user.userName)}
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <NavigationBar />
    </div>
  )
}
