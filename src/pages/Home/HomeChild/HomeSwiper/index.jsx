import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Carousel, Flex } from 'antd-mobile'

// 网络请求
import { getSwiper } from '@/api/home'
import './index.scss'
import '@assets/fonts/iconfont.css'

function HomeSwiper(props) {
  const { cityInfo } = props

  const [swiper, setSwiper] = useState([])
  // 问题： 生命周期函数先渲染render—dom元素此时轮播图数据为零系统不轮播
  //  定义一个flag开关
  // 获取数据后flag：true
  // render中做一个判断数据加载成功后再渲染轮播图
  const [flag, setflag] = useState(false)

  useEffect(() => {
    _getSwiper()
  }, [])

  const _getSwiper = async () => {
    // 发送请求
    const res = await getSwiper()
    setSwiper(res.data.body)
    setflag(true)
  }

  const carouselContent = () => (
    <div style={{ height: 204 }} className="swiper">
      {flag ? (
        <Carousel
          autoplay={true}
          infinite
          dotActiveStyle={{
            backgroundColor: '#21b979',
          }}
          dotStyle={{
            backgroundColor: '#f2f2f2',
          }}
        >
          {swiper.map((item) => (
            <a
              key={item.id}
              href="javascript;"
              style={{
                display: 'inline-block',
                width: '100%',
                height: 204,
              }}
            >
              <img
                src={`http://localhost:8080${item.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
              />
            </a>
          ))}
        </Carousel>
      ) : (
        ''
      )}
      {/* 顶部导航 */}
      <Flex className="con">
        <div className="left">
          <div className="dz" onClick={() => props.history.push('/citylist')}>
            <span>{cityInfo}</span>
            <i className="iconfont icon-arrow"></i>
          </div>
          <div className="search" onClick={() => props.history.push('/search')}>
            <i className="iconfont icon-seach"></i>
            <span>请输入小区或地址</span>
          </div>
        </div>
        <div className="right" onClick={() => props.history.push('/map')}>
          <i className="iconfont icon-map"></i>
        </div>
      </Flex>
    </div>
  )

  return <div>{carouselContent()}</div>
}

export default withRouter(HomeSwiper)
