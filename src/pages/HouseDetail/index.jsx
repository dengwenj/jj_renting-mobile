import React, { Component } from 'react'

import { Carousel, Flex, Modal } from 'antd-mobile'

import NavHeader from '@components/NavHeader'
import HouseItem from '@components/HosueItem'
import HousePackage from '@components/HousePackage'
import BASE_URL from '@utils/url'
import { getHouseDetail } from '@api/house'
import { houseFavorites, addFavorites, removeFavorites } from '@api/user'
import { getItem } from '@utils/storage'

import styles from './index.module.css'
import './index.scss'

const alert = Modal.alert

// 猜你喜欢
const recommendHouses = [
  {
    id: 1,
    src: BASE_URL + '/img/message/1.png',
    desc: '72.32㎡/南 北/低楼层',
    title: '安贞西里 3室1厅',
    price: 4500,
    tags: ['随时看房'],
  },
  {
    id: 2,
    src: BASE_URL + '/img/message/2.png',
    desc: '83㎡/南/高楼层',
    title: '天居园 2室1厅',
    price: 7200,
    tags: ['近地铁'],
  },
  {
    id: 3,
    src: BASE_URL + '/img/message/3.png',
    desc: '52㎡/西南/低楼层',
    title: '角门甲4号院 1室1厅',
    price: 4300,
    tags: ['集中供暖'],
  },
]

// 百度地图
const BMapGL = window.BMapGL

const labelStyle = {
  position: 'absolute',
  zIndex: -7982820,
  backgroundColor: 'rgb(238, 93, 91)',
  color: 'rgb(255, 255, 255)',
  height: 25,
  padding: '5px 10px',
  lineHeight: '14px',
  borderRadius: 3,
  boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
  whiteSpace: 'nowrap',
  fontSize: 12,
  userSelect: 'none',
}

export default class HouseDetail extends Component {
  state = {
    isLoading: false,

    houseInfo: {
      // 房屋图片
      houseImg: [],
      // 标题
      title: '',
      // 标签
      tags: [],
      // 租金
      price: 0,
      // 房型
      roomType: '两室一厅',
      // 房屋面积
      size: 89,
      // 装修类型
      renovation: '精装',
      // 朝向
      oriented: [],
      // 楼层
      floor: '',
      // 小区名称
      community: '',
      // 地理位置
      coord: {
        latitude: '39.928033',
        longitude: '116.529466',
      },
      // 房屋配套
      supporting: [],
      // 房屋标识
      houseCode: '',
      // 房屋描述
      description: '',
    },

    // 是否收藏
    isFavorite: false,
  }

  /* 
     检查房源是否收藏
         1 在 state 中添加状态 isFavorite（表示是否收藏），默认为 false
         2 创建方法 checkFavorite，在进入房源详情页面时调用该方法
         3 先判断是否登录
         4 如果未登录，直接 return，不再检查是否收藏
         5 如果已登录，从路由参数中，获取到当前房屋 id
         6 使用接口，查询该房源是否收藏
         7 如果返回状态码为200，就更新 isFavorite 否则，不做任何处理
         8 在页面结构中，通过状态 isFavorite 修改收藏按钮的文字和图片内容
  */

  componentDidMount() {
    this._getHouseDetail()
    this._houseFavorites()
  }

  // 是否收藏
  _houseFavorites = async () => {
    const { id } = this.props.match.params

    if (getItem('jjzf_token')) {
      // 没有登录就不做任何操作 登录了就发送请求 更新状态 isFavorite
      const res = await houseFavorites(id)
      if (res.data.status === 200) {
        const { isFavorite } = res.data.body
        this.setState({
          isFavorite,
        })
      }
    }
  }

  // 发送请求
  _getHouseDetail = async () => {
    this.setState({
      isLoading: true,
    })
    const { id } = this.props.match.params
    const res = await getHouseDetail(id)
    this.setState({
      houseInfo: res.data.body,
      isLoading: false,
    })

    const { community, coord } = res.data.body

    // 渲染地图
    this.renderMap(community, coord)
  }

  // 渲染轮播图结构
  renderSwipers() {
    const {
      houseInfo: { houseImg },
    } = this.state

    return houseImg.map((item) => (
      <a
        key={item}
        href="javascript;"
        style={{
          display: 'inline-block',
          width: '100%',
          height: 252,
        }}
      >
        <img
          src={BASE_URL + item.imgSrc}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
        />
      </a>
    ))
  }

  // 渲染地图
  renderMap(community, coord) {
    const { latitude, longitude } = coord

    const map = new BMapGL.Map('map')
    const point = new BMapGL.Point(longitude, latitude)
    map.centerAndZoom(point, 17)

    const label = new BMapGL.Label('', {
      position: point,
      offset: new BMapGL.Size(0, -36),
    })

    label.setStyle(labelStyle)
    label.setContent(`
      <span>${community}</span>
      <div class="${styles.mapArrow}"></div>
    `)
    map.addOverlay(label)
  }

  // 点击收藏
  handleFavorite = async () => {
    const { id } = this.props.match.params
    // 判断是否登录
    if (getItem('jjzf_token')) {
      // 发送请求收藏房源 或者 取消收藏房源
      // 判断 isFavorite 为 true 还是 false true 就是添加过收藏的 false 就是没有
      if (this.state.isFavorite) {
        // 添加过收藏的 这里就要删除收藏
        const res = await removeFavorites(id)
        if (res.data.status === 200) {
          // 更新状态
          this.setState({
            isFavorite: false,
          })
        }
        return
      }
      // 走这里来了说明没有收藏过 就发送请求收藏
      const res = await addFavorites(id)
      // 更新状态
      if (res.data.status === 200) {
        // 更新状态
        this.setState({
          isFavorite: true,
        })
      }
      return
    }
    // 到这里来了说明没有登录弹出对话框就跳转到登录页面
    alert('提示', '收藏房源需要登录，是否登录？', [
      { text: '取消', onPress: () => {} },
      {
        text: '确定',
        onPress: () => {
          // 点击确定跳转到登录页面
          this.props.history.push('/login', {
            from: this.props.location,
          })
        },
      },
    ])
  }

  render() {
    const {
      isLoading,
      houseInfo: {
        community,
        title,
        tags,
        price,
        roomType,
        size,
        floor,
        oriented,
        supporting,
        description,
      },
    } = this.state
    return (
      <div className={`${styles.root} detail`}>
        {/* 导航栏 */}
        <NavHeader
          className={styles.navHeader}
          rightContent={[<i key="share" className="iconfont icon-share" />]}
        >
          {community}
        </NavHeader>

        {/* 轮播图 */}
        <div className={styles.slides}>
          {!isLoading ? (
            <Carousel autoplay infinite autoplayInterval={5000}>
              {this.renderSwipers()}
            </Carousel>
          ) : (
            ''
          )}
        </div>

        {/* 房屋基础信息 */}
        <div className={styles.info}>
          <h3 className={styles.infoTitle}>{title}</h3>
          <Flex className={styles.tags}>
            <Flex.Item>
              {tags.map((item, index) => (
                <span
                  key={item}
                  className={[styles.tag, styles['tag' + (index + 1)]].join(
                    ' '
                  )}
                >
                  {item}
                </span>
              ))}
            </Flex.Item>
          </Flex>

          <Flex className={styles.infoPrice}>
            <Flex.Item className={styles.infoPriceItem}>
              <div>
                {price}
                <span className={styles.month}>/月</span>
              </div>
              <div>租金</div>
            </Flex.Item>
            <Flex.Item className={styles.infoPriceItem}>
              <div>{roomType}</div>
              <div>房型</div>
            </Flex.Item>
            <Flex.Item className={styles.infoPriceItem}>
              <div>{size}平米</div>
              <div>面积</div>
            </Flex.Item>
          </Flex>

          <Flex className={styles.infoBasic} align="start">
            <Flex.Item>
              <div>
                <span className={styles.title}>装修：</span>
                精装
              </div>
              <div>
                <span className={styles.title}>楼层：</span>
                {floor}
              </div>
            </Flex.Item>
            <Flex.Item>
              <div>
                <span className={styles.title}>朝向：</span>
                {oriented.join('、')}
              </div>
              <div>
                <span className={styles.title}>类型：</span>普通住宅
              </div>
            </Flex.Item>
          </Flex>
        </div>

        {/* 地图位置 */}
        <div className={styles.map}>
          <div className={styles.mapTitle}>
            小区：
            <span>{community}</span>
          </div>
          <div className={styles.mapContainer} id="map">
            地图
          </div>
        </div>

        {/* 房屋配套 */}
        <div className={styles.about}>
          <div className={styles.houseTitle}>房屋配套</div>

          {supporting.length === 0 ? (
            <div className={styles.titleEmpty}>暂无数据</div>
          ) : (
            <HousePackage list={supporting} />
          )}
        </div>

        {/* 房屋概况 */}
        <div className={styles.set}>
          <div className={styles.houseTitle}>房源概况</div>
          <div>
            <div className={styles.contact}>
              <div className={styles.user}>
                <img src={BASE_URL + '/img/avatar.png'} alt="头像" />
                <div className={styles.useInfo}>
                  <div>王女士</div>
                  <div className={styles.userAuth}>
                    <i className="iconfont icon-auth" />
                    已认证房主
                  </div>
                </div>
              </div>
              <span className={styles.userMsg}>发消息</span>
            </div>

            <div className={styles.descText}>
              {description || '暂无房屋描述'}
            </div>
          </div>
        </div>

        {/* 推荐 */}
        <div className={styles.recommend}>
          <div className={styles.houseTitle}>猜你喜欢</div>
          <div className={styles.items}>
            <HouseItem content={recommendHouses} />
          </div>
        </div>

        {/* 底部收藏按钮 */}
        <Flex className={styles.fixedBottom}>
          <Flex.Item onClick={this.handleFavorite}>
            <img
              src={
                BASE_URL +
                (this.state.isFavorite ? '/img/star.png' : '/img/unstar.png')
              }
              className={`${styles.favoriteImg} `}
              style={{
                color: 'red',
              }}
              alt="收藏"
            />
            <span className={styles.favorite}>
              {this.state.isFavorite ? '已收藏' : '收藏'}
            </span>
          </Flex.Item>
          <Flex.Item>在线咨询</Flex.Item>
          <Flex.Item>
            <a href="tel:400-618-4000" className={styles.telephone}>
              电话预约
            </a>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}
