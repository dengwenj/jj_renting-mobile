import React, { Component } from 'react'
import NavHeader from '@components/NavHeader'
import { getItem } from '@utils/storage'
import { getHouseData } from '@api/area'
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
    const { label, value } = getItem('jjzf')
    //创建地址解析器实例
    const myGeo = new window.BMapGL.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      async (point) => {
        if (point) {
          // point 这个是坐标
          // 初始化地图，设置地图展示级别
          map.centerAndZoom(point, 11)
          map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放

          // 添加控件
          map.addControl(new window.BMapGL.ZoomControl()) // 添加缩放控件
          map.addControl(new window.BMapGL.ScaleControl()) // 添加比例尺控件
        }

        // 渲染所有区的房源覆盖物
        // 1 获取数据
        // 2 遍历数据，创建覆盖物，给每个覆盖物添加唯一标识 坐标
        // 3 给覆盖物添加点击事件
        // 4 在单击事件中，获取到当前点击项的唯一标识
        // 5 放大地图（为13），调用 clearOverlays() 方法清除当前覆盖物
        const res = await getHouseData(value)
        res.data.body.forEach((item) => {
          const {
            coord: { latitude, longitude },
            value,
          } = item
          // 房源覆盖物 为每一条数据创建覆盖物
          // 1 创建 label 实例对象
          // 当前每个坐标
          const areaPoint = new window.BMapGL.Point(longitude, latitude)
          const opts = {
            position: areaPoint,
            offset: new window.BMapGL.Size(-35, -35),
          }
          const label = new window.BMapGL.Label('', opts)
          // 调用 Label 的 setContent() 方法，传入 HTML 结构
          label.setContent(
            `<div>
            <div class="${styles.bubble}">${item.label}</div>
            <div class="${styles.name}">${item.count}套</div>
          </div>`
          )
          // 2 调用 setStyle() 方法设置样式
          label.setStyle({
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: 'rgb(11, 156, 107, 0.8)',
            border: '1px solid #fff',
            color: 'red',
            textAlign: 'center',
            lineHeight: '70px',
            cursor: 'pointer',
          })
          // 给每个覆盖物添加唯一标识
          label.id = value
          // 给文本覆盖物添加点击事件
          label.addEventListener('click', () => {
            console.log('点击', label.id)
            // 放大地图（为13）
            map.centerAndZoom(areaPoint, 13)
            // 调用 clearOverlays() 方法清除当前覆盖物
            map.clearOverlays()
          })
          // 3 在 map 对象上调用 addOverlay() 放法，将文本覆盖物添加到地图中
          map.addOverlay(label)
        })
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
