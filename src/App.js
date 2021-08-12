import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LayOut from './pages/LayOut'
import CityList from './pages/CityList'

export default function App() {
  return (
    <BrowserRouter>
      {/* 配置路由 */}
      {/* 一级路由 */}
      {/* 这个必须要包 Switch 如果不包的话就要往下面找 就会导致 layOut 组件那种情况 就是找到 news 路径了 还往下找，就又去重定向 /home 了 */}
      <Switch>
        <Route path="/" component={LayOut} />
        <Route path="/citylist" component={CityList} />
      </Switch>
    </BrowserRouter>
  )
}
