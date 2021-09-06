import React from 'react'

import ScrollTop from '../module/scroll-top/index.js'
import Header from './default/Header'
import Footer from './default/Footer'

const DefaultLayout = ({children}) => {
  return (
    <React.Fragment>
			<Header />
        {children}
      <ScrollTop />
      <Footer />
    </React.Fragment>
  )
}

export default DefaultLayout
