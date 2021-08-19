import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LayOut from './pages/LayOut'
import CityList from './pages/CityList'
import Search from './pages/Search'
import Map from './pages/Map'
import Rent from './pages/Rent'
import RentAdd from './pages/Rent/Add'
import RentSearch from './pages/Rent/Search'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login'
import Registe from './pages/Registe'

import AuthRoute from '@components/AuthRoute'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* 配置路由 */}
        {/* 一级路由 */}
        <Switch>
          <AuthRoute exact path="/rent" component={Rent} />
          <AuthRoute exact path="/rent/add" component={RentAdd} />
          <AuthRoute exact path="/rent/search" component={RentSearch} />
          <Route exact path="/registe" component={Registe} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/detail/:id" component={HouseDetail} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/citylist" component={CityList} />
          {/* 这个要写在后面 */}
          <Route path="/" component={LayOut} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
