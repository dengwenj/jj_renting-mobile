import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LayOut from './pages/LayOut'
import CityList from './pages/CityList'
import Search from './pages/Search'
import Map from './pages/Map'
import Rent from './pages/Rent'
import HouseDetail from './pages/HouseDetail'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* 配置路由 */}
        {/* 一级路由 */}
        <Switch>
          <Route exact path="/detail/:id" component={HouseDetail} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/rent" component={Rent} />
          <Route exact path="/citylist" component={CityList} />
          {/* 这个要写在后面 */}
          <Route path="/" component={LayOut} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
