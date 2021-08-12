import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import LayOut from './pages/LayOut'
import CityList from './pages/CityList'

export default function App() {
  return (
    <BrowserRouter>
      {/* 配置路由 */}
      {/* 一级路由 */}
      <Route path="/" component={LayOut} />
      <Route path="/citylist" component={CityList} />
    </BrowserRouter>
  )
}
