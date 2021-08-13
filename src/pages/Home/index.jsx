import React, { Component } from 'react'

import HomeSwiper from './HomeChild/HomeSwiper'
import HomeNav from './HomeChild/HomeNav'
import HomeGroups from './HomeChild/HomeGroups'

export default class Home extends Component {
  render() {
    return (
      <div>
        {/* 轮播图 */}
        <HomeSwiper />
        {/* 轮播图 */}
        {/* 导航菜单 */}
        <HomeNav />
        {/* 导航菜单 */}

        {/* 租房小组 */}
        <HomeGroups />
        {/* 租房小组 */}
      </div>
    )
  }
}
