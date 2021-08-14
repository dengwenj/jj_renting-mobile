import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import { List, AutoSizer } from 'react-virtualized'
import { getCityList, getHotCity } from '@api/area'
import getCurrentCity from '@utils/currentCity'
import './index.scss'
import '@assets/fonts/iconfont.css'

const indexData = (letter) => {
  switch (letter) {
    case '#':
      return '定位城市'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}

export default class CityList extends Component {
  state = {
    cityList: {},
    cityIndex: [],
  }

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
    this.setState({
      cityList,
      cityIndex,
      active: 0,
    })
  }

  // 渲染每一行数据的渲染函数
  // 函数的返回值就表示最终渲染在页面中的内容
  rowRenderer = ({
    key, //唯一的 key 值
    index, // 索引号
    isScrolling, // 当前项是否正在滚动中
    isVisible, // 当前项在 list 中是可见的
    style, // 指定每一行的位置 样式
  }) => {
    const { cityIndex, cityList } = this.state
    const letter = cityIndex[index]
    const city = cityList[letter]
    return (
      <div key={key} style={style} className="city">
        <div className="title">{indexData(letter)}</div>
        {city.map((item) => (
          <div className="name" key={item.value}>
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  // 创建动态计算每一行高度的方法
  getRowHeight = ({ index }) => {
    const { cityIndex, cityList } = this.state
    const TITLE_HEIGHT = 36
    const NAME_HEIGHT = 50
    // 索引标题高度 + 城市数量 * 城市名称的高度
    // 城市数量
    const cityLength = cityList[cityIndex[index]].length
    return TITLE_HEIGHT + cityLength * NAME_HEIGHT
  }

  // 右侧的索引列表
  ringhtIndexList = () => {
    const { cityIndex, active } = this.state
    return cityIndex.map((item, index) => (
      <li
        className={`right_index ${active === index ? 'active' : ''}`}
        key={item}
      >
        {item === 'hot' ? '热' : item.toUpperCase()}
      </li>
    ))
  }

  // 滚动城市列表让索引高亮
  onRowsRendered = ({ startIndex }) => {
    // 判断 如果当前的这个索引不等于状态中的索引了就更新
    if (startIndex !== this.state.active) this.setState({ active: startIndex })
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
        <AutoSizer className="list">
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
            />
          )}
        </AutoSizer>
        {/* 右侧索引列表 */}
        <ul className="right">{this.ringhtIndexList()}</ul>
      </div>
    )
  }
}
