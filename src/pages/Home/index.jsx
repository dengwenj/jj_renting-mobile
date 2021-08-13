import React, { Component } from 'react'
import HomeSwiper from './HomeChild/HomeSwiper'
import HomeNav from './HomeChild/HomeNav'
import HomeGroups from './HomeChild/HomeGroups'
import HomeNews from './HomeChild/HomeNews'
import getCurrentCity from '@utils/currentCity'

export default class Home extends Component {
  state = { cityInfo: '上海' }

  // 挂载完毕调用的生命周期钩子
  componentDidMount() {
    // 调用就返回了当前城市 在 utils 里面封装了 直接调用就行了 返回的是 Promise
    this._getCurrentCity()
  }

  _getCurrentCity = async () => {
    const res = await getCurrentCity()
    this.setState({
      cityInfo: res.label,
    })
  }

  render() {
    return (
      <div>
        {/* 轮播图 */}
        <HomeSwiper cityInfo={this.state.cityInfo} />
        {/* 轮播图 */}

        {/* 导航菜单 */}
        <HomeNav />
        {/* 导航菜单 */}
        {/* 租房小组 */}

        <HomeGroups />
        {/* 租房小组 */}

        {/* 最新资讯 */}
        <HomeNews />
        {/* 最新资讯 */}
      </div>
    )
  }
}
