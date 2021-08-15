import React, { useState, useEffect } from 'react'
import { Flex } from 'antd-mobile'
import BASE_URL from '@utils/url'

import { rentingGroups } from '@api/home'
import './index.scss'

export default function HomeGroups() {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    _rentingGroups()
  }, [])

  const _rentingGroups = async () => {
    // 发送请求
    const res = await rentingGroups()
    setGroups(res.data.body)
  }

  const fGroups = () => {
    return groups.map((item) => {
      return (
        <Flex className="flex" key={item.id}>
          <Flex.Item className="item">
            <div className="left">
              <span className="title">{item.title}</span>
              <span className="desc">{item.desc}</span>
            </div>
            <div className="img">
              <img src={BASE_URL + item.imgSrc} alt="" />
            </div>
          </Flex.Item>
        </Flex>
      )
    })
  }

  return (
    <div className="home_groups">
      <div className="header">
        <h3>租房小组</h3>
        <span>更多</span>
      </div>
      <div>{fGroups()}</div>
    </div>
  )
}
