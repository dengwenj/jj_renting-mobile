import React, { Component } from 'react'
import NavHeader from '@components/NavHeader'
import { getItem } from '@utils/storage'
import styles from './index.module.css'

export default class Map extends Component {
  // 挂载完毕生命周期调用的钩子
  componentDidMount() {
    this.initMap()
  }

  initMap = () => {
    // 创建地图实例
    // 在 react 脚手架中全局对象需要使用 window 来访问，否则，会造成 ESLint 校验错误
    const map = new window.BMapGL.Map('container')
    // 设置中心点坐标
    // const point = new window.BMapGL.Point(116.404, 39.915)
    // 地图初始化，同时设置地图展示级别
    // map.centerAndZoom(point, 15)

    // 根据定位展示当前城市
    const { label } = getItem('jjzf')
    //创建地址解析器实例
    const myGeo = new window.BMapGL.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      function (point) {
        if (point) {
          // 初始化地图，设置地图展示级别
          map.centerAndZoom(point, 11)
          map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放

          // 添加控件
          map.addControl(new window.BMapGL.ZoomControl()) // 添加缩放控件
          map.addControl(new window.BMapGL.ScaleControl()) // 添加比例尺控件
        }
      },
      label
    )
  }

  render() {
    return (
      <div className={styles.map}>
        <NavHeader>地图找房</NavHeader>
        {/* 创建地图容器元素 */}
        <div id="container" className={styles.container}></div>
      </div>
    )
  }
}
