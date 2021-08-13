import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import './index.scss'
import '@assets/fonts/iconfont.css'

export default class CityList extends Component {
  render() {
    return (
      <div className="cityList">
        <NavBar
          className="navbar"
          mode="light"
          icon={<i className="iconfont icon-back" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          城市选择
        </NavBar>
      </div>
    )
  }
}
