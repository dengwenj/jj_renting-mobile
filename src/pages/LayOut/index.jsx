import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import News from '../News'

export default class LayOut extends Component {
  render() {
    return (
      <div>
        布局
        {/* 子路由 因为我在父路由里面写的 pathname 是 / 所以这里的子路由可以这样写 /news*/}
        <Route path="/news" component={News} />
      </div>
    )
  }
}
