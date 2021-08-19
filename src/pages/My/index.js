import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Grid, Button, Modal } from 'antd-mobile'

import BASE_URL from '@utils/url'
import { getItem, removeItem } from '@utils/storage'

import { getUserInfo, userLogout } from '@api/user'

import styles from './index.module.css'

const alert = Modal.alert

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity',
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' },
]

/* 
 1 在 state 中添加两个状态 isLogin（是否登录）和 userInfo（用户信息）
//  2 从 utils 中导入 is
 3 创建 getUserInfo 用来获取个人资料
 4 在方法中，通过 isLogin 判断用户是否登录
 5 如果没有登录，则不发送请求，渲染为登录信息
 6 如果已登录，就根据接口发送请求，获取用户个人资料
 7 渲染个人资料数据
*/

export default class Profile extends Component {
  avatarEditor = React.createRef()

  state = {
    userInfo: {
      nickname: '',
      avatar: '' || BASE_URL + '/img/profile/avatar.png',
    },
  }

  componentDidMount() {
    // 一上来就要判断 有没有 token 有就是登录
    this.userToken()
  }

  // 用户是否有 token
  userToken = async () => {
    if (getItem('jjzf_token')) {
      // 有就是登录 就显示登录的我的页面 获取个人资料
      const res = await getUserInfo()
      // 有可能 token过期了 判断请求是否成功有没有返回数据
      if (res.data.status === 200) {
        const { nickname, avatar } = res.data.body
        this.setState({
          userInfo: {
            nickname: nickname,
            avatar: BASE_URL + avatar,
          },
        })
      } else {
        // token 失效的情况，这种情况下，应该重新更新页面
        this.setState({
          userInfo: {
            nickname: '',
            avatar: '' || BASE_URL + '/img/profile/avatar.png',
          },
        })
      }
    }
  }

  // 退出功能
  logout = () => {
    //  确定退出 删除 本地存储中的 token 值 更新状态
    alert('提示', '确定退出吗？', [
      { text: '取消', onPress: () => {} },
      {
        text: '确定',
        onPress: async () => {
          removeItem('jjzf_token')
          await userLogout()
          this.setState({
            userInfo: {
              nickname: '',
              avatar: '' || BASE_URL + '/img/profile/avatar.png',
            },
          })
        },
      },
    ])
  }

  render() {
    const {
      userInfo: { nickname, avatar },
    } = this.state
    const { history } = this.props

    return (
      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={BASE_URL + '/img/profile/bg.png'}
            alt="背景图"
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img className={styles.avatar} src={avatar} alt="icon" />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{nickname || '游客'}</div>
              {/* 登录后展示： */}
              {getItem('jjzf_token') ? (
                <>
                  <div className={styles.auth}>
                    <span onClick={this.logout}>退出</span>
                  </div>
                  <div className={styles.edit}>
                    编辑个人资料
                    <span className={styles.arrow}>
                      <i className="iconfont icon-arrow" />
                    </span>
                  </div>
                </>
              ) : (
                // 未登录
                <div className={styles.edit}>
                  <Button
                    type="primary"
                    size="small"
                    inline
                    onClick={() => history.push('/login')}
                  >
                    去登录
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 九宫格菜单 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={(item) =>
            item.to ? (
              <Link to={item.to}>
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
              <div className={styles.menuItem}>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            )
          }
        />

        {/* 加入我们 */}
        <div className={styles.ad}>
          <img src={BASE_URL + '/img/profile/bg.png'} alt="" />
        </div>
      </div>
    )
  }
}
