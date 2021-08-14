import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import { List } from 'react-virtualized'
import { getCityList, getHotCity } from '@api/area'
import getCurrentCity from '@utils/currentCity'
import './index.scss'
import '@assets/fonts/iconfont.css'

// 列表数据的数据源
const list = Array(100).fill('react-virtualized')

// 渲染每一行数据的渲染函数
// 函数的返回值就表示最终渲染在页面中的内容
function rowRenderer({
  key, //唯一的 key 值
  index, // 索引号
  isScrolling, // 当前项是否正在滚动中
  isVisible, // 当前项在 list 中是可见的
  style, // 指定每一行的位置 样式
}) {
  return (
    <div key={key} style={style}>
      {list[index]} {isScrolling + ''} {isVisible + ''}
    </div>
  )
}

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

    // 获取当前定位城市数据，并添加到现有数据列表中
    const res2 = await getCurrentCity()
    cityList['#'] = [res2]
    cityIndex.unshift('#')
    // console.log(cityList, cityIndex)
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

        {/* 城市列表 */}
        <List
          width={300}
          height={300}
          rowCount={list.length}
          rowHeight={20}
          rowRenderer={rowRenderer}
        />
      </div>
    )
  }
}
