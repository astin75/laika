import { Button, Select, Table } from '@mantine/core'
import { projectCollection } from 'imports/db'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React, { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import NavigationBar from 'ui/components/NavigationBar/NavigationBar'

import styles from './UserControl.module.css'

export default function UserControl() {
  const userList = useTracker(() => Meteor.users.find({}).fetch())
  const [selectValue, setSelectValue] = useState('')
  const rankOption = [
    { value: 'admin', label: 'admin' },
    { value: 'worker', label: 'worker' },
    { value: 'inspector', label: 'inspector' },
  ]

  const onRankChange = (userName) => {
    if (selectValue) {
      console.log('aa', selectValue, '22')
      let oops = Meteor.users.findOne({ username: userName })
      Meteor.users.update(oops._id, { $set: { profile: { rank: { selectValue } } } })
    }
  }

  const onDelete = (userName) => {
    console.log(userName)

    let oops = Meteor.users.findOne({ username: userName })
    console.log(oops, 'aa')
    Meteor.users.remove(oops._id)
  }

  const handleChange = (option) => {
    setSelectValue(option)
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
            userList.map((x, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>{x.username}</td>
                <td>
                  <Select
                    onChange={(rankOption) => handleChange(rankOption)}
                    className={styles.selectBTN}
                    defaultValue={x.profile.rank}
                    data={rankOption}
                  />
                </td>
                <td>
                  <Button color="teal" size="compact-sm" onClick={() => onRankChange(x.username)}>
                    적용
                  </Button>{' '}
                  &nbsp; / &nbsp;
                  <Button color="red" size="compact-sm" onClick={() => onDelete(x.username)}>
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
