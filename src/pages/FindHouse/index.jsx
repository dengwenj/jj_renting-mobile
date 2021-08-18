import React, { Component } from 'react'
import {
  List,
  WindowScroller,
  AutoSizer,
  InfiniteLoader,
} from 'react-virtualized'
import { Toast } from 'antd-mobile'
import SearchHeader from '@components/SearchHeader'
import { getItem } from '@utils/storage'
import Filter from './componentschild/Filter'
import { getHousesList } from '@api/house'
import HosueItem from '@components/HosueItem'
import Sticky from '@components/Sticky'
import NotHouse from '@components/NotHouse'
import './index.scss'

const { value } = getItem('jjzf')
export default class FindHouse extends Component {
  state = {
    start: 1, // 页码
    end: 10, // 每页多少条数据
    list: [], // 列表数据
    count: 0, // 总共获取的数据
    isLoading: false,
  }

  // 挂载完毕调用的钩子
  componentDidMount() {
    // 调用 searchHouseList 获取数据
    this.searchHouseList({})
    this.filters = {}
  }

  // 发送请求
  searchHouseList = async (filters) => {
    Toast.loading('加载中...', 0, null, false)
    this.setState({
      isLoading: true,
    })
    this.filters = filters
    const { start, end } = this.state
    filters.start = start
    filters.end = end
    filters.cityId = value
    const res = await getHousesList(filters)
    Toast.hide()
    this.setState({
      list: res.data.body.list,
      count: res.data.body.count,
      isLoading: false,
    })

    if (this.state.count !== 0) {
      Toast.info(`共找到${this.state.count}套房源`)
    }
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

  // 表示每一行数据是否加载完成
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index]
  }

  // 加载更多数据的方法，在需要加载更多数据时，会调用这个方法
  // 返回值数要是 Promise 对象，并且这个对象应该在数据加载完成时，来调用 resolve 让 Promise 对象的状态变为已完成
  loadMoreRows = ({ startIndex, stopIndex }) => {
    return new Promise(async (resolve, reject) => {
      Toast.loading('加载中...', 0, null, false)
      const res = await getHousesList({
        cityId: value,
        ...this.filters,
        start: startIndex,
        end: stopIndex,
      })
      Toast.hide()
      //  合并数据
      this.setState({
        list: [...this.state.list, ...res.data.body.list],
      })
      // 数据加载完毕，调用 resolve 即可
      resolve()
    })
  }

  render() {
    const { count } = this.state
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
        <Sticky height={40}>
          <Filter ref="filterRef" searchHouseList={this.searchHouseList} />
        </Sticky>
        {/* 区域，方式，租金，筛选部分 */}

        {/* List 列表 */}
        <div className="house_list">
          {this.state.count === 0 && this.state.isLoading === false ? (
            <NotHouse>没有找到房源，请换个搜索条件吧~</NotHouse>
          ) : (
            <InfiniteLoader
              isRowLoaded={this.isRowLoaded} // 表示每一行数据是否加载完成
              loadMoreRows={this.loadMoreRows} // 加载更多数据的方法，在需要加载更多数据时，会调用这个方法
              rowCount={count ? count : 0}
            >
              {({ onRowsRendered, registerChild }) => (
                <WindowScroller>
                  {({ height, isScrolling, scrollTop }) => (
                    <AutoSizer>
                      {({ width }) => (
                        <List
                          onRowsRendered={onRowsRendered}
                          registerChild={registerChild}
                          autoHeight // 设置高度 WindowScroller 最终渲染的列表高度
                          width={width} // 视口的宽度
                          height={height} // 视口的高度
                          rowCount={count ? count : 0} // List列表项的行数
                          rowHeight={120} // 每一行的高度
                          rowRenderer={this.hosueListItem} // 渲染列表项中的每一行
                          isScrolling={isScrolling}
                          scrollTop={scrollTop}
                        />
                      )}
                    </AutoSizer>
                  )}
                </WindowScroller>
              )}
            </InfiniteLoader>
          )}
        </div>
        {/* List 列表 */}
      </div>
    )
  }
}
