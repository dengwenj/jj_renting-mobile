import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import CityList from './pages/CityList'

export default function App() {
  return (
    <BrowserRouter>
      {/* 配置导航菜单 */}
      <Link to="/home">首页</Link>
      <Link to="/citylist">城市选择</Link>

      {/* 配置路由 */}
      <Route path="/home" component={Home} />
      <Route path="/citylist" component={CityList} />
    </BrowserRouter>
  )
}
