import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { NavBar } from 'antd-mobile'
// import './index.scss'
import styles from './index.module.css'

function NavHeader(props) {
  // 默认点击行为 如果传了的话就按自己点击行为来做
  const goBack = () => props.history.goBack()

  return (
    <NavBar
      className={styles.navBar}
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onLeftClick={props.onLeftClick || goBack}
    >
      {props.children}
    </NavBar>
  )
}

// 给组件添加 props 校验
NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func,
}

export default withRouter(NavHeader)
