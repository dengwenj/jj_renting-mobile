import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import LayOut from './pages/LayOut'
import CityList from './pages/CityList'

export default function App() {
  return (
    <BrowserRouter>
      {/* 配置导航菜单 */}
      <Link to="/">布局</Link>
      <Link to="/citylist">城市选择</Link>
      {/* 配置路由 */}
      {/* 一级路由 */}
      <Route path="/" component={LayOut} />
      <Route path="/citylist" component={CityList} />
    </BrowserRouter>
  )
}
