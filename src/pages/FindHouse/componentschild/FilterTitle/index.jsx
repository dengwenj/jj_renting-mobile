import React, { Component } from 'react'
import { SegmentedControl } from 'antd-mobile'
import './index.scss'

export default class FilterTitle extends Component {
  // 回调函数, 其中e.nativeEvent.selectedSegmentIndex是选中项索引, e.nativeEvent.value是选中的值.
  onChange = (e) => {
    if (e.nativeEvent.selectedSegmentIndex === 3) {
      // 第二个参数 false 是 open 第三个参数 true 是 isShowMore
      this.props.filterTitle(3, false, true)
    }
  }

  // 回调函数
  onValueChange = (val) => {
    console.log(val)
  }

  render() {
    const { indexTitle } = this.props
    return (
      <div className="filter_title">
        <SegmentedControl
          className="title"
          tintColor="#13a677"
          values={['区域', '方式', '租金', '筛选']}
          selectedIndex={indexTitle}
          onChange={this.onChange}
          onValueChange={this.onValueChange}
        />
      </div>
    )
  }
}
