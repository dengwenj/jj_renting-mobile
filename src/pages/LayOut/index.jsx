import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { TabBar } from 'antd-mobile'

import Home from '../Home'
import FindHouse from '../FindHouse'
import News from '../News'
import My from '../My'
import tabBarItem from '../../utils/tabBarItem'
import './index.css'

export default class LayOut extends Component {
  state = {
    // 默认选中的 TabBar 菜单项
    selectedTab: this.props.location.pathname,
  }

  // tabbar.item 代码重构不要重复写 用遍历
  tabBarItems = () =>
    tabBarItem.map((item) => (
      <TabBar.Item
        title={item.title}
        key={item.path}
        icon={<i className={`iconfont ${item.icon}`} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.setState({ selectedTab: item.path })
          this.props.history.push(item.path)
        }}
      />
    ))

  render() {
    return (
      <div className="layout">
        {/* 二级路由  二级路由也要从一级路由这里下来 先要一级路由在二级路由 所有上哪里的拦截器就进不到这里 */}
        {/* 子路由 因为我在父路由里面写的 pathname 是 / 所以这里的子路由可以这样写 /news*/}
        {/* 这个必须要包 Switch 如果不包的话就要往下面找 就会导致 layOut 组件那种情况 就是找到 news 路径了 还往下找，就又去重定向 /home 了 */}
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/findhouse" component={FindHouse} />
          <Route path="/news" component={News} />
          <Route path="/my" component={My} />
          <Redirect to="/home" />
        </Switch>

        {/* tabbar */}
        <TabBar tintColor="#21b979" barTintColor="white">
          {/* 这里调用他  先返回值是 map方法，map方法再返回值是数组 react里面数组会帮你遍历 数组里面就是每一个 tabbar.item*/}
          {this.tabBarItems()}
        </TabBar>
      </div>
    )
  }
}
