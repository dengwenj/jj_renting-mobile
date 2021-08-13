import React, { Component } from 'react'
import { cityInfo } from '@api/area'
import HomeSwiper from './HomeChild/HomeSwiper'
import HomeNav from './HomeChild/HomeNav'
import HomeGroups from './HomeChild/HomeGroups'
import HomeNews from './HomeChild/HomeNews'

export default class Home extends Component {
  state = { cityInfo: '上海' }
  // 挂载完毕调用的生命周期钩子
  componentDidMount() {
    // 通过 IP 定位 获取到当前城市的名称
    const currentCity = new window.BMapGL.LocalCity()
    currentCity.get(async (res) => {
      const res1 = await cityInfo(res)
      this.setState({
        cityInfo: res1.data.body.label,
      })
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
