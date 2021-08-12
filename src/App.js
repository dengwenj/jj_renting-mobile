import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LayOut from './pages/LayOut'
import CityList from './pages/CityList'

export default function App() {
  return (
    <BrowserRouter>
      {/* 配置路由 */}
      {/* 一级路由 */}
      <Switch>
        <Route exact path="/citylist" component={CityList} />
        {/* 这个要写在后面 */}
        <Route path="/" component={LayOut} />
      </Switch>
    </BrowserRouter>
  )
}
