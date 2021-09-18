import React, { useEffect, useState } from 'react'
import { Meteor } from 'meteor/meteor'
import styles from './LoginPage.module.css'
import { Link } from 'react-router-dom'

import { TextInput, Button, PasswordInput, Image, Text, Highlight, Alert } from '@mantine/core'
import { useForm } from '@mantine/hooks'

export default function LoginPage({ setIsThereAccount }) {
  const [userID, setUserID] = useState('')
  const [userPW, setUserPW] = useState('')
  const [errPW, setErrPW] = useState('')

  const loginProcess = () => {
    const handleError = (err) => {
      if (err) {
        setErrPW('비밀번호가 틀렸습니다.')
      } else {
        setErrPW('')
        setIsThereAccount(true)
      }
    }
    Meteor.loginWithPassword(userID, userPW, handleError)
  }

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.title}>
          <Image width={150} radius="md" src="Laika-main.png" alt="Random unsplash image" />
        </div>

        <TextInput
          placeholder="ID"
          description="아이디를 입력해주세요."
          onChange={(e) => {
            setUserID(e.target.value)
          }}
          className={styles.inputValue}
        ></TextInput>
        <PasswordInput
          error={errPW}
          description="비밀번호를 입력해주세요."
          placeholder="Password"
          onChange={(e) => {
            setUserPW(e.target.value)
          }}
          className={styles.inputValue}
        ></PasswordInput>

        <Button color="teal" className={styles.command} onClick={loginProcess}>
          로그인
        </Button>
        <div className={styles.textForm}>
          <Text size="sm" align="right">
            아이디가 없으신가요?&nbsp;
            <Text
              className={styles.signUpLink}
              color={'blue'}
              highlight={['회원가입']}
              onClick={() => {
                setIsThereAccount(false)
              }}
              size="sm"
            >
              회원가입
            </Text>
            을 요청하세요.
          </Text>
        </div>
      </div>
    </div>
  )
}
