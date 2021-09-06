import React, { Component } from 'react'

class ScrollTop extends Component {
  constructor() {
    super()

    this.delayInMs = '0'
    this.scrollStepInPx = 100

    this.state = {
      intervalId: 0,
      showScoller: false,
    }

    this.toggleScroll = this.toggleScroll.bind(this)
    this.scrollStep = this.scrollStep.bind(this)
  }

  componentDidMount() {
    window.addEventListener("scroll", this.toggleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.toggleScroll)
  }

  toggleScroll() {
    if (window.pageYOffset > 200) {
      this.setState({ showScoller: true })
    } else {
      this.setState({ showScoller: false })
    }
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId)
    }
    window.scroll(0, window.pageYOffset - this.scrollStepInPx)
  }

  scrollToTop(e) {
    e.preventDefault()

    let intervalId = setInterval(this.scrollStep, this.delayInMs)
    this.setState({ intervalId: intervalId })
  }

  render() {
    if (this.state.showScoller) {
      return (
        <a href="#" className="scroll-top" onClick={(e) => { this.scrollToTop(e) }}>
          <i className="arrow up" aria-hidden="true" />
        </a>
      )
    }
    return null
  }
}

export default ScrollTop
