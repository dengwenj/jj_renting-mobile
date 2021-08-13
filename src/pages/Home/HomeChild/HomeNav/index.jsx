import React from 'react'
import { withRouter } from 'react-router-dom'
import { Flex } from 'antd-mobile'

import './index.scss'
import Nav1 from '@/assets/images/nav-1.png'
import Nav2 from '@/assets/images/nav-2.png'
import Nav3 from '@/assets/images/nav-3.png'
import Nav4 from '@/assets/images/nav-4.png'

const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/findhouse',
  },
  {
    id: 2,
    img: Nav2,
    title: '和租',
    path: '/news',
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map',
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/rent',
  },
]

function HomeNav(props) {
  // 返回值渲染到页面上
  const navsItem = () =>
    navs.map((item) => (
      <Flex.Item key={item.id} onClick={navItemClick(item)}>
        <img src={item.img} alt="" />
        <h2>{item.title}</h2>
      </Flex.Item>
    ))

  const navItemClick = (item) => () => {
    props.history.push(item.path)
  }

  return (
    <div className="nav">
      <Flex>{navsItem()}</Flex>
    </div>
  )
}

export default withRouter(HomeNav)
