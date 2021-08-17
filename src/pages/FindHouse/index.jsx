import React, { Component } from 'react'
import { List } from 'react-virtualized'
import SearchHeader from '@components/SearchHeader'
import { getItem } from '@utils/storage'
import Filter from './componentschild/Filter'
import { getHousesList } from '@api/house'
import HosueItem from '@components/HosueItem'
import './index.scss'

export default class FindHouse extends Component {
  state = {
    start: 1, // 页码
    end: 10, // 每页多少条数据
    list: [], // 列表数据
    count: null, // 总共获取的数据
  }

  // 挂载完毕调用的钩子
  componentDidMount() {
    // 调用 searchHouseList 获取数据
    this.searchHouseList({})
  }

  searchHouseList = async (filters) => {
    const { value } = getItem('jjzf')
    const { start, end } = this.state
    filters.start = start
    filters.end = end
    filters.cityId = value
    const res = await getHousesList(filters)
    this.setState({
      list: res.data.body.list,
      count: res.data.body.count,
    })
  }

  // 渲染每一行数据的渲染函数
  // 函数的返回值就表示最终渲染在页面中的内容
  hosueListItem = ({
    key, //唯一的 key 值
    index, // 索引号
    isScrolling, // 当前项是否正在滚动中
    isVisible, // 当前项在 list 中是可见的
    style, // 指定每一行的位置 样式
  }) => {
    return <HosueItem key={key} style={style} content={this.state.list} />
  }

  render() {
    const { label } = getItem('jjzf')
    return (
      <div className="find_house">
        {/* 顶部导航栏 */}
        <div className="top">
          <i
            className="iconfont icon-back"
            onClick={() => this.props.history.goBack()}
          ></i>
          <SearchHeader cityInfo={label} />
        </div>
        {/* 顶部导航栏 */}

        {/* 区域，方式，租金，筛选部分 */}
        <Filter searchHouseList={this.searchHouseList} />
        {/* 区域，方式，租金，筛选部分 */}

        {/* List 列表 */}
        <div className="house_list">
          <List
            width={800}
            height={300}
            rowCount={this.state.count ? this.state.count : 0} // List列表项的行数
            rowHeight={120} // 每一行的高度
            rowRenderer={this.hosueListItem} // 渲染列表项中的每一行
          />
        </div>
        {/* List 列表 */}
      </div>
    )
  }
}
