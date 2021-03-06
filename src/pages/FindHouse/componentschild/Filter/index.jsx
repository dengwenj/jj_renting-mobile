import React, { Component } from 'react'
import { Flex, Drawer } from 'antd-mobile'

import { getHouseFind } from '@api/house'
import { getItem } from '@utils/storage'
import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
import FilterBottom from '@components/FilterBottom'
import '@assets/fonts/iconfont.css'
import './index.scss'

// 外面头部的数据源
const titleList = [
  {
    title: '区域',
    type: 'area',
  },
  {
    title: '方式',
    type: 'mode',
  },
  {
    title: '租金',
    type: 'price',
  },
  {
    title: '筛选',
    type: 'more',
  },
]

// 显示默认值
const selectedValues = {
  0: ['area', 'null'],
  1: ['null'],
  2: ['null'],
  3: [],
}
export default class Filter extends Component {
  state = {
    open: false,
    zIndex: -1,
    indexTitle: 0,
    indexIsSan: null,
    isShowMore: false,
    selectedSegmentIndex: null,
    filtersData: {},
    value: null, // FilterPicker 里面的 value
    num: null, // FilterPicker 里面传的 num 标识
    selectedValues,
  }

  // 挂载完毕调用的钩子
  componentDidMount() {
    this._getHouseFind()
  }

  // 网络请求
  _getHouseFind = async () => {
    const { value } = getItem('jjzf')
    const res = await getHouseFind(value)
    const filtersData = res.data.body
    this.setState({
      filtersData,
    })
  }

  // 点击外面的头部的功能
  flexItemClick = (index) => {
    return () => {
      if (index !== 3)
        return this.setState({
          open: true,
          zIndex: 1,
          indexTitle: index,
          indexIsSan: null,
        })

      // 当等于三是显示外部的筛选
      this.setState({
        indexIsSan: index,
        isShowMore: true,
        zIndex: 1,
      })
    }
  }

  // 展示外面的头部功能
  flexItem = () => {
    return titleList.map((item, index) => {
      return (
        <Flex.Item
          className={`flex_item ${
            index === this.state.selectedSegmentIndex ? 'active' : ''
          }`}
          key={item.title}
          onClick={this.flexItemClick(index)}
        >
          {item.title}
          <i className="iconfont icon-arrow"></i>
        </Flex.Item>
      )
    })
  }

  // open 状态切换时调用  就是触发了遮罩层
  onOpenChange = () => {
    this.setState({
      open: false,
      zIndex: -1,
    })
  }

  // 子传父
  onOpenChangeMore = (bool, zIndex) => {
    this.setState({
      isShowMore: bool,
      zIndex,
    })
  }

  // 点击确定
  qdClick = (num, selectedValues) => {
    this.setState(
      {
        open: false,
        zIndex: -1,
        selectedSegmentIndex: this.state.indexTitle,
        selectedValues: {
          ...this.state.selectedValues,
          [num]: selectedValues,
        },
      },
      () => {
        // 因为 用的 React里面的事件 所以更新状态是异步的 在后面的回调函数才拿得到最新的状态
        /* 
          组装筛选条件
              1 在 Filter 组件的 onSave 方法中，根据最新 selectedValues 组装筛选条件 filters
              2 获取区域数据的参数名，area 或 subway （选中值数组的第一个元素）
              3 获取区域数据的值（以最后一个 value 为准）
              4 获取方式和租金的值（选中值的第一个元素）
              5 获取筛选 （more） 的值（将选中值数组转化为以逗号分隔的字符串）
        */
        const { selectedValues } = this.state
        let filters = {}

        // 区域
        const areaKey = selectedValues[0][0]
        let res = 'null'
        if (selectedValues[0].length === 3) {
          res =
            selectedValues[0][2] !== 'null'
              ? selectedValues[0][2]
              : selectedValues[0][1]
        }
        filters[areaKey] = res

        // 租金和方式
        const mode = selectedValues[1][0]
        filters.rentType = mode
        const price = selectedValues[2][0]
        filters.price = price

        // 筛选
        const more = selectedValues[3].join(',')
        filters.more = more
        // 把参数传递到父组件里面去
        this.props.searchHouseList(filters)
      }
    )
  }

  // 点击取消
  qxClick = () => {
    this.setState({
      open: false,
      zIndex: -1,
    })
  }

  // 子传父 这个是传到 filterMore 里面的 让其点击内部的筛选展示筛选的部分
  filterTitle = (indexIsSan, open, isShowMore) => {
    this.setState({
      indexIsSan,
      open,
      isShowMore,
    })
  }

  // 高亮外部
  gaoLiang = (selectedSegmentIndex) => {
    // 一定要用一个状态 ！！！
    // 如果等于三了 因为就不会点击了，所以这里直接更新
    if (selectedSegmentIndex === 3)
      return this.setState({ selectedSegmentIndex })

    this.setState({
      indexTitle: selectedSegmentIndex,
    })
  }

  // 也传给点击筛选 高亮 关闭功能 这哥关闭功能不是 open 变量 是 isShowMore 变量
  filterGaoLiang = (isShowMore, zIndex, num, selectedValues) => {
    this.setState({
      selectedSegmentIndex: num,
      isShowMore,
      zIndex,
      selectedValues: {
        ...this.state.selectedValues,
        [num]: selectedValues,
      },
    })
  }

  // 子传父 FilterPicker
  filterPicker = (value, num) => {
    this.setState({
      value,
      num,
      selectedValues: {
        ...this.state.selectedValues,
        [num]: value,
      },
    })
  }

  render() {
    // 展示内部数据源
    const sidebar = (
      <div
        style={{
          marginTop: '50px',
          backgroundColor: '#fff',
        }}
      >
        <FilterTitle
          indexTitle={this.state.indexTitle}
          indexIsSan={this.state.indexIsSan}
          filterTitle={this.filterTitle}
          gaoLiang={this.gaoLiang}
        />
        <FilterPicker {...this.state} filterPicker={this.filterPicker} />
        <FilterBottom
          qd={'确定'}
          qx={'取消'}
          qdClick={this.qdClick}
          qxClick={this.qxClick}
        />
      </div>
    )
    return (
      <div className="filter">
        {/* 头部 */}
        <Flex className="flex">{this.flexItem()}</Flex>
        {/* 头部 */}

        {/* 内部  */}
        <div>
          <Drawer
            style={{
              zIndex: this.state.zIndex,
            }}
            className="my-drawer"
            enableDragHandle
            position="top"
            sidebar={sidebar}
            open={this.state.open}
            onOpenChange={this.onOpenChange}
          >
            <div></div>
          </Drawer>
        </div>
        {/* 内部  */}

        {/* 筛选 当点击外部或者内部的筛选时，展示这里 */}
        {this.state.indexIsSan === 3 ? (
          <FilterMore
            isShowMore={this.state.isShowMore}
            onOpenChangeMore={this.onOpenChangeMore}
            zIndex={this.state.zIndex}
            filterGaoLiang={this.filterGaoLiang}
            filtersData={this.state.filtersData}
            qdClick={this.qdClick}
          />
        ) : (
          ''
        )}
        {/* 筛选 当点击外部或者内部的筛选时，展示这里 */}
      </div>
    )
  }
}
