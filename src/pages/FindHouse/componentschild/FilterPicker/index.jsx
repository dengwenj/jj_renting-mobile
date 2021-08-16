import React, { Component } from 'react'
import { PickerView } from 'antd-mobile'

import './index.scss'

export default class FilterPicker extends Component {
  // 选中后的回调
  onChange = (value) => {
    // console.log(value)
  }

  onScrollChange = (value) => {
    // console.log(value)
  }

  PickerViewData = () => {
    const { indexTitle, indexIsSan, filtersData } = this.props
    console.log(filtersData)

    if (indexTitle === 0) {
      // 区域
      this.cascade = true
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
      this.cascade = false
      return filtersData.area ? filtersData.rentType : []
    } else if (indexTitle === 2) {
      // 租金
      this.cascade = false
      return filtersData.area ? filtersData.price : []
    }
  }

  render() {
    return (
      <div className="picker">
        <PickerView
          data={this.PickerViewData()}
          cascade={this.cascade}
          onChange={this.onChange}
          onScrollChange={this.onScrollChange}
        />
      </div>
    )
  }
}
