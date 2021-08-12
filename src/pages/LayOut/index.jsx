import React, { Component } from 'react'
import { Route } from 'react-router-dom'
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
        {/* 子路由 因为我在父路由里面写的 pathname 是 / 所以这里的子路由可以这样写 /news*/}
        {/* <Redirect exact from="/" to="/home" /> */}
        <Route path="/home" component={Home} />
        <Route path="/findhouse" component={FindHouse} />
        <Route path="/news" component={News} />
        <Route path="/my" component={My} />

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
