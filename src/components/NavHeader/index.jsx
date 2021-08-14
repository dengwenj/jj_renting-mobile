import React from 'react'
import { NavBar } from 'antd-mobile'
import './index.scss'

export default function NavHeader({ children }) {
  return (
    <NavBar
      className="navbar"
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onLeftClick={() => this.props.history.goBack()}
    >
      {children}
    </NavBar>
  )
}
