import { Button, Select, Table } from '@mantine/core';
import { userProfileCollection } from 'imports/db/collections';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import NavigationBar from 'ui/components/NavigationBar/NavigationBar';
import SmallNavigation from 'ui/components/SmallNavigation/SmallNavigation';

// @ts-ignore
import styles from './UserControl.module.css';

export default function UserControl() {
  const user = useTracker(() => Meteor.user());
  const [IsThereAdmin, setIsThereAdmin] = useState(true);

  const userList = useTracker(() => userProfileCollection.find({}).fetch());

  const [rank, setRank] = useState('');
  const rankOption = [
    { value: 'admin', label: 'admin' },
    { value: 'worker', label: 'worker' },
    { value: 'inspector', label: 'inspector' },
  ];

  const onRankChange = (userName) => {
    if (rank) {
      let oops = userProfileCollection.findOne({ userName: userName });
      userProfileCollection.update(oops._id, { $set: { rank: rank } });
    }
  };

  const onDelete = (userName) => {
    let oops = Meteor.users.findOne({ userName: userName });
    Meteor.users.remove(oops._id);
  };

  const handleChange = (option) => {
    setRank(option);
  };

  useEffect(() => {
    let id = user?.username;
    let i;
    if (id && IsThereAdmin === false) {
      for (i = 0; i < userList.length; i++) {
        if (id === userList[i].userName && userList[i].rank === 'admin') {
          setIsThereAdmin(true);
        }
      }
    }
  }, [user]);

  return IsThereAdmin === true ? (
    <div className={styles.container}>
      <SmallNavigation />
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
  ) : (
    <Redirect to={'./accountPage'} />
  );
}
