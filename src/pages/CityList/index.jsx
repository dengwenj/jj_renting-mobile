import React, { Component } from 'react'
import { Toast } from 'antd-mobile'
import { List, AutoSizer } from 'react-virtualized'
import { getCityList, getHotCity } from '@api/area'
import getCurrentCity from '@utils/currentCity'
import { setItem } from '@utils/storage'
import NavHeader from '@components/NavHeader'
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

// 只有北上广深才有房源
const bsgs = ['北京', '上海', '广州', '深圳']

export default class CityList extends Component {
  state = {
    cityList: {},
    cityIndex: [],
  }

  // 加载完毕调用的生命周期钩子
  async componentDidMount() {
    await this._getCityList()

    // 调用 measureAllRows，提前计算 List 中每一行的高度，实现 scrollToRow 的精确跳转
    // 调用这个方法的时候，需要保证 List 组件中已经有数据了，没有的话会报错
    // 只要保证这个方法是在获取数据之后调用的即可
    this.listRef.measureAllRows()
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
    const res2 = await getCurrentCity() // utils 里面的
    cityList['#'] = [res2]
    cityIndex.unshift('#')
    this.setState({
      cityList,
      cityIndex,
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
          <div
            className="name"
            key={item.value}
            onClick={() => this.cityClick(item)}
          >
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
        onClick={this.ringhtIndexClick(index)}
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

  // 点击右侧索引
  ringhtIndexClick = (index) => {
    return () => {
      // 调用 List 实例方法 这个方法可以滚动到相应的索引
      this.setState({
        active: index,
      })
      this.listRef.scrollToRow(index)
    }
  }

  // 点击城市
  cityClick = (item) => {
    if (bsgs.indexOf(item.label) !== -1) {
      // 不等于 -1 说明有
      setItem('jjzf', { label: item.label, value: item.value })
      this.props.history.goBack()
      return
    }
    // 不是北上广深就提示用户占无房源
    Toast.info('占无该城市房源', 2, null, false)
  }

  render() {
    return (
      <div className="cityList">
        {/* 顶部导航 */}
        <NavHeader> 城市选择</NavHeader>

        {/* 城市列表 */}
        <AutoSizer className="list">
          {({ width, height }) => (
            <List
              ref={(c) => (this.listRef = c)}
              width={width}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>

        {/* 右侧索引列表 */}
        <ul className="right">{this.ringhtIndexList()}</ul>
      </div>
    )
  }
}
