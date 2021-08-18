import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavHeader from '@components/NavHeader'

import styles from './index.module.css'

import { login } from '@api/user'

import { setItem } from '@utils/storage'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  // 账号
  handleUsername = (e) => {
    this.setState({
      username: e.target.value,
    })
  }

  // 密码
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  handleSubmit = async (e) => {
    // 阻止表单默认行为
    e.preventDefault()
    const { username, password } = this.state
    const res = await login({
      username,
      password,
    })

    const { status } = res.data

    if (status === 200) {
      // 说明登录通过
      setItem('jjzf_token', res.data.body.token)
      this.props.history.replace('/my')
      Toast.success('登录成功', 2)
      return
    }
    Toast.info('账号或者密码错误')
  }

  render() {
    const { username, password } = this.state
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="username"
                placeholder="请输入账号"
                value={username}
                onChange={this.handleUsername}
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={this.handlePassword}
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

export default Login
