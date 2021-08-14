import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import './index.scss'

function NavHeader(props) {
  // 默认点击行为 如果传了的话就按自己点击行为来做
  const goBack = () => props.history.goBack()

  return (
    <NavBar
      className="navbar"
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onLeftClick={props.onLeftClick || goBack}
    >
      {props.children}
    </NavBar>
  )
}
export default withRouter(NavHeader)
