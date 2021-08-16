import React, { Component } from 'react'
import { Flex, Drawer } from 'antd-mobile'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
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
  }

  flexItemClick = (index) => {
    return () => {
      console.log(index)
      this.setState({
        open: true,
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

  render() {
    const sidebar = (
      <div
        style={{
          marginTop: '50px',
          backgroundColor: '#fff',
        }}
      >
        <FilterTitle />
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
      </div>
    )
  }
}
