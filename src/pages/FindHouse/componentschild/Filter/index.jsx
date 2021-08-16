import React, { Component } from 'react'
import { Flex, Drawer } from 'antd-mobile'

// 网络请求
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

export default class Filter extends Component {
  state = {
    open: false,
    zIndex: -1,
    indexTitle: 0,
    indexIsSan: null,
    isShowMore: false,
    selectedSegmentIndex: null,
    filtersData: {},
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
  qdClick = () => {
    this.setState({
      open: false,
      zIndex: -1,
      selectedSegmentIndex: this.state.indexTitle,
    })
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
  filterGaoLiang = (isShowMore, zIndex, num) => {
    this.setState({
      selectedSegmentIndex: num,
      isShowMore,
      zIndex,
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
        <FilterPicker {...this.state} />
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
          />
        ) : (
          ''
        )}
        {/* 筛选 当点击外部或者内部的筛选时，展示这里 */}
      </div>
    )
  }
}
