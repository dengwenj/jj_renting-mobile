import React, { Component } from 'react'
import SearchHeader from '@components/SearchHeader'
import { getItem } from '@utils/storage'
import Filter from './componentschild/Filter'
import { getHousesList } from '@api/house'
import './index.scss'

export default class FindHouse extends Component {
  state = {
    start: 1,
    end: 10,
  }
  searchHouseList = async (filters) => {
    const { value } = getItem('jjzf')
    const { start, end } = this.state
    filters.start = start
    filters.end = end
    filters.cityId = value
    const res = await getHousesList(filters)
    console.log(res)
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
      </div>
    )
  }
}
