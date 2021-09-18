import React, { useState } from 'react'
import { Accounts } from 'meteor/accounts-base'
import styles from './SignUpPage.module.css'

import { TextInput, Button, PasswordInput, Image, Text, Highlight } from '@mantine/core'

export default function SignUpPage({ setIsThereAccount }) {
  const [userID, setUserID] = useState('')
  const [userPW, setUserPW] = useState('')
  const [userPWCHK, setUserPWCHK] = useState('')
  const [errUser, setErrUser] = useState('')
  const [errPW1, setErrPW1] = useState('')
  const [errPW2, setErrPW2] = useState('')

  const signUpProcess = () => {
    const handleError = (err) => {
      if (err) {
      } else {
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
          profile: {
            rank: 'admin',
          },
        },
        handleError
      )
    } else {
      props.mode('signUp')
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
