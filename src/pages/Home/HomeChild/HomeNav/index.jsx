import React from 'react'
import { Flex } from 'antd-mobile'

import './index.css'
import Nav1 from '../../../../assets/images/nav-1.png'
import Nav2 from '../../../../assets/images/nav-2.png'
import Nav3 from '../../../../assets/images/nav-3.png'
import Nav4 from '../../../../assets/images/nav-4.png'

export default function HomeNav() {
  return (
    <div className="nav">
      <Flex>
        <Flex.Item>
          <img src={Nav1} alt="" />
          <h2>整租</h2>
        </Flex.Item>
        <Flex.Item>
          <img src={Nav2} alt="" />
          <h2>合租</h2>
        </Flex.Item>
        <Flex.Item>
          <img src={Nav3} alt="" />
          <h2>地图找房</h2>
        </Flex.Item>
        <Flex.Item>
          <img src={Nav4} alt="" />
          <h2>去出租</h2>
        </Flex.Item>
      </Flex>
    </div>
  )
}
