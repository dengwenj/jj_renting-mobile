import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Carousel } from 'antd-mobile'
import BASE_URL from '@utils/url'
import SearchHeader from '@components/SearchHeader'

// 网络请求
import { getSwiper } from '@/api/home'

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
                src={BASE_URL + item.imgSrc}
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
      <SearchHeader cityInfo={cityInfo} />
    </div>
  )

  return <div>{carouselContent()}</div>
}

export default withRouter(HomeSwiper)
