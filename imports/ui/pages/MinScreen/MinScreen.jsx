import React from 'react'

import styles from './MinScreen.module.css'

const MinScreen = () => {
  return (
    <div className={styles.minScreen}>
      <h3 style={{ color: '#4c4c4c' }}>1024 이상 화면에서만 작동합니다.</h3>
    </div>
  )
}

export default MinScreen
