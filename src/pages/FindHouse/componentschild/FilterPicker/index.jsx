import React, { Component } from 'react'
import { PickerView } from 'antd-mobile'

import './index.scss'

export default class FilterPicker extends Component {
  state = {
    value: this.props.selectedValues[this.props.num],
  }
  // 选中后的回调
  onChange = (value) => {
    this.setState({ value })
    this.props.filterPicker(value, this.props.indexTitle)
  }

  // onScrollChange = (value) => {
  //   console.log(value)
  // }

  // 展示数据源
  PickerViewData = () => {
    const { indexTitle, filtersData } = this.props

    if (indexTitle === 0) {
      // 区域
      this.cols = 3
      return filtersData.area
        ? [
            {
              label: filtersData.area.label,
              value: filtersData.area.value,
              children: filtersData.area.children,
            },
            {
              label: filtersData.subway.label,
              value: filtersData.subway.value,
              children: filtersData.subway.children,
            },
          ]
        : []
    } else if (indexTitle === 1) {
      // 方式
      // this.cascade = false
      this.cols = 1
      return filtersData.area ? filtersData.rentType : []
    } else if (indexTitle === 2) {
      // 租金
      // this.cascade = false
      this.cols = 1
      return filtersData.area ? filtersData.price : []
    }
  }

  render() {
    // console.log(this.props.selectedValues[this.props.num])
    return (
      <div className="picker">
        <PickerView
          data={this.PickerViewData()}
          onChange={this.onChange}
          // onScrollChange={this.onScrollChange}
          value={this.state.value}
          cols={this.cols}
        />
      </div>
    )
  }
}
