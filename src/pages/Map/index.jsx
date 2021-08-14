import React, { Component } from 'react'
import NavHeader from '@components/NavHeader'
import './index.scss'

export default class Map extends Component {
  // 挂载完毕生命周期调用的钩子
  componentDidMount() {
    // 创建地图实例
    // 在 react 脚手架中全局对象需要使用 window 来访问，否则，会造成 ESLint 校验错误
    const map = new window.BMapGL.Map('container')
    // 设置中心点坐标
    const point = new window.BMapGL.Point(116.404, 39.915)
    // 地图初始化，同时设置地图展示级别
    map.centerAndZoom(point, 15)
  }
  render() {
    return (
      <div className="map">
        <NavHeader>地图找房</NavHeader>
        {/* 创建地图容器元素 */}
        <div id="container"></div>
      </div>
    )
  }
}
