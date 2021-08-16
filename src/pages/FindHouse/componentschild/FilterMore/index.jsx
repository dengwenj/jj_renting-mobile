import React, { Component } from 'react'
// import { Drawer } from 'antd-mobile'
import { Drawer } from 'antd-mobile'
import FilterBottom from '@components/FilterBottom'

import './index.scss'

export default class FilterMore extends Component {
  onOpenChange = () => {
    // 子传父
    this.props.onOpenChangeMore(false, -1)
  }

  qxClick = () => {}

  qdClick = () => {
    console.log(2)
  }
  render() {
    const { isShowMore, zIndex } = this.props
    console.log(isShowMore)
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
