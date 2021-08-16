import React, { Component } from 'react'
// import { Drawer } from 'antd-mobile'
import { Drawer } from 'antd-mobile'
import FilterBottom from '@components/FilterBottom'

import './index.scss'

export default class FilterMore extends Component {
  // open 状态切换时调用 就是触发了遮罩层
  onOpenChange = () => {
    // 子传父
    this.props.onOpenChangeMore(false, -1)
    console.log(1)
  }

  // 点击清除
  qxClick = () => {}

  // 点击确定
  qdClick = () => {
    console.log(2)
  }

  render() {
    const { isShowMore, zIndex } = this.props

    // 展示的数据源
    const sidebar = (
      <div>
        <div className="fliter_more">
          <div className="item">
            <div className="sub_title">户型</div>
            <div className="flex_more">
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
            </div>
          </div>
          <div className="item">
            <div className="sub_title">户型</div>
            <div className="flex_more">
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
            </div>
          </div>
          <div className="item">
            <div className="sub_title">户型</div>
            <div className="flex_more">
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
            </div>
          </div>
          <div className="item">
            <div className="sub_title">户型</div>
            <div className="flex_more">
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
              <div className="flexitem_more">11</div>
            </div>
          </div>
        </div>
        <FilterBottom
          className="filter_bottom"
          qd={'确定'}
          qx={'清除'}
          qxClick={this.qxClick}
          qdClick={this.qdClick}
        />
      </div>
    )
    return (
      <div className="drawer_more">
        <Drawer
          className="drawer"
          position="right"
          style={{ zIndex }}
          sidebar={sidebar}
          open={isShowMore}
          onOpenChange={this.onOpenChange}
        >
          <div></div>
        </Drawer>
      </div>
    )
  }
}
