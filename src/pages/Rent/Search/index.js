import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { getCity } from '@utils/city'

import { communitySearch } from '@api/area'

import styles from './index.module.css'

export default class Search extends Component {
  // 当前城市id
  cityId = getCity().value

  state = {
    // 搜索框的值
    searchTxt: '',
    tipsList: [],
  }

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map((item) => (
      <li key={item.community} className={styles.tip}>
        {item.communityName}
      </li>
    ))
  }

  /* 
    关键词搜索小区信息
        1 给 SearchBar 组件，添加 onChange 配置项，获取文本框的值
        2 判断当前文本框的值是否为空
        3 如果为空，清空列表，然后 return，不再发送请求
        4 如果不为空，发送请求，获取小区数据
        5 使用定时器 setTimeout 来延迟搜索，提升性能 防抖
  */

  searchbarChange = (value) => {
    this.setState({
      searchTxt: value,
    })
    if (value) {
      // 值不为空，发送请求，获取小区数据
      // 开启定时器 防抖
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const res = await communitySearch(value, this.cityId)
        console.log(res)
        const tipsList = res.data.body
        this.setState({
          tipsList,
        })
      }, 500)
      return
    }
    // 到这来了说明文本框的值为空了 就清除列表 不让展示
    this.setState({
      tipsList: [],
    })
  }

  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          showCancelButton={true}
          onCancel={() => history.replace('/rent/add')}
          onChange={this.searchbarChange}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}
