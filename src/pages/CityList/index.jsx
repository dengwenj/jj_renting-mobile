import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import { getCityList, getHotCity } from '@api/area'
import './index.scss'
import '@assets/fonts/iconfont.css'

export default class CityList extends Component {
  // 加载完毕调用的生命周期钩子
  componentDidMount() {
    this._getCityList()
  }

  // 数据格式化的方法
  cityData = (list) => {
    const cityList = {}
    // 1 遍历 list 数组
    list.forEach((item) => {
      // 2 获取每一个城市的首字母
      const first = item.short.substr(0, 1)
      // 3 判断 cityList 中是否有该分类 // 4 如果有，直接往该分类中 push 数据
      if (cityList[first]) return cityList[first].push(item)
      // 5 如果没有，就先创建一个数组，然后把当前城市信息添加到数组中
      cityList[first] = [item]
    })
    // 获取索引数据 返回的是一个对象里面属性的数组
    const cityIndex = Object.keys(cityList).sort()
    return {
      cityList,
      cityIndex,
    }
  }

  _getCityList = async () => {
    const res = await getCityList()
    // 这里是整理数据
    const { cityList, cityIndex } = this.cityData(res.data.body)

    // 获取热门城市数据
    const res1 = await getHotCity()
    // 将数据添加到 cityList 中
    cityList['hot'] = res1.data.body
    // 将索引添加到 cityIndex 中
    cityIndex.unshift('hot')
  }

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
