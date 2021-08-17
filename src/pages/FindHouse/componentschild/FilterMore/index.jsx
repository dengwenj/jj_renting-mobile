import React, { Component } from 'react'
// import { Drawer } from 'antd-mobile'
import { Drawer } from 'antd-mobile'
import FilterBottom from '@components/FilterBottom'

import './index.scss'

export default class FilterMore extends Component {
  /* 
    1 在 state 中添加 selectedValues（表示选中项的值）
    2 给标签绑定单击事件，通过参数获取到当前项的 value
    3 判断 selectedValues 中是否包含当前项的 value 值
    4 如果不包含，就将当前项的 value 添加到 selectedValues 数组中
    5 如果包含，就将 selectedValues 数组中移除（使用数组的 splice 方法，根据索引号删除）
    6 在渲染标签时，判断 selectedValues（表示选中项的值） 数组中，是否包含当前项的 value，包含，就添加高亮类
   */
  state = {
    selectedValues: [],
  }

  // open 状态切换时调用 就是触发了遮罩层
  onOpenChange = () => {
    // 子传父
    this.props.onOpenChangeMore(false, -1)
  }

  // 点击清除
  qxClick = () => {
    // 更新状态中的数组为空就行了
    this.setState({
      selectedValues: [],
    })
  }
  /* 
    清除和确定的逻辑处理
        1 点击取消按钮时，清空所有选中项的值（selectedValue:[]）
        2 点击确定按钮了，将当前选中项的值和 type，传递给 Filter 父组件
       
  */
  // 点击确定
  qClick = () => {
    this.props.qdClick(3, this.state.selectedValues)
    // 点击确定让筛选那个按钮高亮 还有关闭这个筛选
    // 点击确定按钮了，将当前选中项的值和 type，传递给 Filter 父组件 3, this.state.selectedValues
    this.props.filterGaoLiang(false, -2, 3, this.state.selectedValues)
  }

  // 点击每一项
  itemClick = (value) => {
    return () => {
      const { selectedValues } = this.state
      // 等于 -1 说明不包含，不包含添加到数组中
      if (selectedValues.indexOf(value) === -1)
        return this.setState({ selectedValues: [...selectedValues, value] })
      // 如果点击了 数组中包含 value 就删除当前的 value 根据索引删除，然后在更新状态
      // 获取数组中的索引
      // const i = selectedValues.indexOf(value) 这两种方法都可以获取到数组中的索引
      const index = selectedValues.findIndex((item) => item === value)
      selectedValues.splice(index, 1) // 删除当前的元素
      this.setState({
        selectedValues: [...selectedValues], // 删除当前的元素了然后在更新状态 要这样更新 ...的方式 展开运算符
      })
    }
  }

  renderFilters = (params) => {
    // 添加高亮效果数组中有就添加
    return params.map((item) => {
      return (
        <div
          className={`flexitem_more ${
            this.state.selectedValues.indexOf(item.value) !== -1
              ? 'flex_moregaoliang'
              : ''
          }`}
          key={item.value}
          onClick={this.itemClick(item.value)}
        >
          {item.label}
        </div>
      )
    })
  }

  render() {
    const {
      isShowMore,
      zIndex,
      filtersData: { roomType, oriented, floor, characteristic },
    } = this.props

    // 展示的数据源
    const sidebar = (
      <div>
        <div className="fliter_more">
          <div className="item">
            <div className="sub_title">户型</div>
            <div className="flex_more">{this.renderFilters(roomType)}</div>
          </div>
          <div className="item">
            <div className="sub_title">朝向</div>
            <div className="flex_more">
              <div className="flex_more">{this.renderFilters(oriented)}</div>
            </div>
          </div>
          <div className="item">
            <div className="sub_title">楼层</div>
            <div className="flex_more">
              <div className="flex_more">
                {this.renderFilters(floor)}
                <div
                  style={{
                    width: 200,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="sub_title">房屋亮点</div>
            <div className="flex_more">
              <div className="flex_more">
                {this.renderFilters(characteristic)}
              </div>
            </div>
          </div>
        </div>
        <FilterBottom
          className="filter_bottom"
          qd={'确定'}
          qx={'清除'}
          qxClick={this.qxClick}
          qdClick={this.qClick}
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
