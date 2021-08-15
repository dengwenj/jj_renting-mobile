import React, { Component } from 'react'
import SearchHeader from '@components/SearchHeader'
import { getItem } from '@utils/storage'
import './index.scss'

export default class FindHouse extends Component {
  render() {
    const { label } = getItem('jjzf')
    return (
      <div className="find_house">
        <div className="top">
          <i
            className="iconfont icon-back"
            onClick={() => this.props.history.goBack()}
          ></i>
          <SearchHeader cityInfo={label} />
        </div>
      </div>
    )
  }
}
