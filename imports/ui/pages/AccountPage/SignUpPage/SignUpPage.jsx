import { Button, Highlight, Image, PasswordInput, Text, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { userProfileCollection } from 'imports/db'
import { Accounts } from 'meteor/accounts-base'
import React, { useState } from 'react'

import styles from './SignUpPage.module.css'

export default function SignUpPage({ setIsThereAccount }) {
  const [userID, setUserID] = useState('')
  const [userPW, setUserPW] = useState('')
  const [userPWCHK, setUserPWCHK] = useState('')
  const [errUser, setErrUser] = useState('')
  const [errPW1, setErrPW1] = useState('')
  const [errPW2, setErrPW2] = useState('')

  const notifications = useNotifications()
  const showNotification = (msg, color) =>
    notifications.showNotification({
      title: '',
      message: msg,
      color: color,
    })

  const signUpProcess = () => {
    const handleError = (err) => {
      if (err) {
        setIsThereAccount(false)
        showNotification('중복된 아이디가 있습니다.! 🤥', 'red')
        return
      } else {
        showNotification('환영합니다.! 🤥', 'teal')
        let tempProjectInfo = {
          userName: userID,
          rank: 'admin',
        }
        userProfileCollection.insert(tempProjectInfo)
      }
    }

    let loginFlag = false
    let passwordFlag = false
    if (userID.length > 4) {
      loginFlag = true
    } else {
      setErrUser('ID는 5자 이상으로 만들어 주세요..')
    }
    if (userPW.length > 4) {
      if (userPW !== userPWCHK) {
        setErrPW2('비밀번호가 일치하지 않습니다.')
      } else {
        passwordFlag = true
      }
    } else {
      setErrPW1('비밀번호는 5자 이상으로 만들어 주세요.')
    }

    if (loginFlag && passwordFlag) {
      setIsThereAccount(true)
      Accounts.createUser(
        {
          username: userID,
          password: userPW,
        },
        handleError
      )
    } else {
      setIsThereAccount(true)
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <Image width={150} radius="md" src="Laika-main.png" alt="Random unsplash image" />
      </div>
      <div className={styles.textForm}>
        <Text
          align="right"
          className={styles.signUpLink}
          color={'blue'}
          highlight={['회원가입']}
          onClick={() => {
            setIsThereAccount(true)
          }}
          size="sm"
        >
          로그인 페이지지로 돌아가기
        </Text>
      </div>
      <TextInput
        error={errUser}
        placeholder="ID"
        description="아이디를 5자 이상 입력해주세요."
        onChange={(e) => {
          setUserID(e.target.value)
        }}
        className={styles.inputValue}
      ></TextInput>
      <PasswordInput
        error={errPW1}
        placeholder="password"
        description="비밀번호를 입력해주세요."
        onChange={(e) => {
          setUserPW(e.target.value)
        }}
        className={styles.inputValue}
      ></PasswordInput>
      <PasswordInput
        error={errPW2}
        placeholder="password"
        description="비밀번호를 한번 더 입력해주세요."
        onChange={(e) => {
          setUserPWCHK(e.target.value)
        }}
        className={styles.inputValue}
      ></PasswordInput>

      <Button className={styles.command} onClick={signUpProcess}>
        회원가입
      </Button>
    </div>
  )
}
