import React, { Component } from 'react'
import { Flex, Drawer } from 'antd-mobile'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
import FilterBottom from '@components/FilterBottom'
import '@assets/fonts/iconfont.css'
import './index.scss'

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
  }

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

  flexItem = () => {
    return titleList.map((item, index) => {
      return (
        <Flex.Item
          className="flex_item"
          key={item.title}
          onClick={this.flexItemClick(index)}
        >
          {item.title}
          <i className="iconfont icon-arrow"></i>
        </Flex.Item>
      )
    })
  }

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

  render() {
    const sidebar = (
      <div
        style={{
          marginTop: '50px',
          backgroundColor: '#fff',
        }}
      >
        <FilterTitle indexTitle={this.state.indexTitle} />
        <FilterPicker />
        <FilterBottom qd={'确定'} qx={'取消'} />
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
            dragToggleDistance={20}
          >
            <div></div>
          </Drawer>
        </div>
        {/* 内部  */}

        {/* 筛选 当点击外部的筛选时，展示这里 */}
        {this.state.indexIsSan === 3 ? (
          <FilterMore
            isShowMore={this.state.isShowMore}
            onOpenChangeMore={this.onOpenChangeMore}
            zIndex={this.state.zIndex}
          />
        ) : (
          ''
        )}
        {/* 筛选 */}
      </div>
    )
  }
}
