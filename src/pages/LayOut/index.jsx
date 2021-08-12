import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { TabBar } from 'antd-mobile'

import Home from '../Home'
import FindHouse from '../FindHouse'
import News from '../News'
import My from '../My'
import './index.css'

export default class LayOut extends Component {
  state = {
    // 默认选中的 TabBar 菜单项
    selectedTab: this.props.location.pathname,
  }

  render() {
    console.log(this.props.location.pathname)
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
          <TabBar.Item
            title="首页"
            key="/home"
            icon={<i className="iconfont icon-ind" />}
            selectedIcon={<i className="iconfont icon-ind" />}
            selected={this.state.selectedTab === '/home'}
            onPress={() => {
              this.setState({ selectedTab: '/home' })
              this.props.history.push('/home')
            }}
          />
          <TabBar.Item
            icon={<i className="iconfont icon-findHouse" />}
            selectedIcon={<i className="iconfont icon-findHouse" />}
            title="找房"
            key="/findHouse"
            selected={this.state.selectedTab === '/findHouse'}
            onPress={() => {
              this.setState({ selectedTab: '/findHouse' })
              this.props.history.push('/findhouse')
            }}
          />
          <TabBar.Item
            icon={<i className="iconfont icon-infom" />}
            selectedIcon={<i className="iconfont icon-infom" />}
            title="资讯"
            key="news"
            selected={this.state.selectedTab === '/news'}
            onPress={() => {
              this.setState({ selectedTab: '/news' })
              this.props.history.push('/news')
            }}
          />
          <TabBar.Item
            icon={<i className="iconfont icon-my" />}
            selectedIcon={<i className="iconfont icon-my" />}
            title="我的"
            key="/my"
            selected={this.state.selectedTab === '/my'}
            onPress={() => {
              this.setState({ selectedTab: '/my' })
              this.props.history.push('/my')
            }}
          />
        </TabBar>
      </div>
    )
  }
}
