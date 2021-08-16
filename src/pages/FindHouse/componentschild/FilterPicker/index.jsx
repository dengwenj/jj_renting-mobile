import React, { Component } from 'react'
import { PickerView } from 'antd-mobile'

import './index.scss'

export default class FilterPicker extends Component {
  state = {
    value: null,
  }

  onChange = (value) => {
    console.log(value)
    this.setState({
      value,
    })
  }

  onScrollChange = (value) => {
    console.log(value)
  }

  render() {
    const seasons = [
      [
        {
          label: '区域',
          value: '区域',
        },
        {
          label: '地铁',
          value: '地铁',
        },
      ],
      [
        {
          label: '不限',
          value: '不限',
        },
        {
          label: '杨浦',
          value: '杨浦',
        },
      ],
    ]
    return (
      <div className="picker">
        <PickerView
          onChange={this.onChange}
          onScrollChange={this.onScrollChange}
          value={this.state.value}
          data={seasons}
          cascade={false}
        />
      </div>
    )
  }
}
