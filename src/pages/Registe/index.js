import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavHeader from '@components/NavHeader'

import styles from './index.module.css'

import { registe } from '@api/user'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{3,12}$/

class Registe extends Component {
  state = {
    registe: {
      username: '',
      password: '',
    },
  }

  handleUsername = (e) => {
    this.setState({
      registe: {
        ...this.state.registe,
        username: e.target.value,
      },
    })
  }

  handlePassword = (e) => {
    this.setState({
      registe: {
        ...this.state.registe,
        password: e.target.value,
      },
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    // 点击注册 注册成功返回登录页面
    const res = await registe(this.state.registe)
    console.log(res)
    this.props.history.goBack()
    Toast.info('注册成功', 2)
  }

  render() {
    const {
      registe: { username, password },
    } = this.state

    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>注册</NavHeader>
        <WhiteSpace size="xl" />
        <WingBlank>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.formItem}>
              <label className={styles.label}>用户名</label>
              <input
                className={styles.input}
                placeholder="请输入账号"
                value={username}
                onChange={this.handleUsername}
              />
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>密码</label>
              <input
                className={styles.input}
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={this.handlePassword}
              />
            </div>
            {/* <div className={styles.formItem}>
              <label className={styles.label}>重复密码</label>
              <input
                className={styles.input}
                type="password"
                placeholder="请重新输入密码"
              />
            </div> */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                注册
              </button>
            </div>
          </form>
          <Flex className={styles.backHome} justify="between">
            <Link to="/home">点我回首页</Link>
            <Link to="/login">已有账号，去登录</Link>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

export default Registe
