import React, { useState, useEffect } from 'react'
import { WingBlank } from 'antd-mobile'

import { newNews } from '@api/home'
import './index.scss'

export default function HomeNews() {
  const [news, setNews] = useState([])

  useEffect(() => {
    _newNews()
  }, [])

  const _newNews = async () => {
    // 发送请求
    const res = await newNews()
    setNews(res.data.body)
  }

  const newsContent = () => {
    return news.map((item) => {
      return (
        <WingBlank size="md" key={item.id}>
          <div className="content">
            <div className="left">
              <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
            </div>
            <div className="right">
              <div>
                <div className="top">{item.title}</div>
                <div className="bottom">
                  <span className="from">{item.from}</span>
                  <span className="date">{item.date}</span>
                </div>
              </div>
            </div>
          </div>
        </WingBlank>
      )
    })
  }

  return (
    <div className="news">
      <h3 className="new">最新资讯</h3>
      {newsContent()}
    </div>
  )
}
