import React, { Component } from 'react'
import { SegmentedControl } from 'antd-mobile'
import './index.scss'

export default class FilterTitle extends Component {
  render() {
    return (
      <div className="filter_title">
        <SegmentedControl
          className="title"
          tintColor="#13a677"
          values={['区域', '方式', '租金', '筛选']}
          onChange={this.onChange}
          onValueChange={this.onValueChange}
        />
      </div>
    )
  }
}
