import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'
import { withFormik } from 'formik'

import { Link } from 'react-router-dom'

import NavHeader from '@components/NavHeader'

import styles from './index.module.css'

import { login } from '@api/user'

import { setItem } from '@utils/storage'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  /* state = {
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
  } */

  render() {
    // const { username, password } = this.state
    const { values, handleSubmit, handleChange } = this.props
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="username"
                placeholder="请输入账号"
                value={values.username}
                onChange={handleChange}
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
                value={values.password}
                onChange={handleChange}
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

/* 
  1 导入 withFormik，使用 withFormik 高阶组件包裹 Login 组件
  2 为 withFormik 提供配置对象：mapPropsToValues 和 handleSubmit
  3 在 Login 组件中，通过 props 获取到 values（表单元素对象），handleSubmit，handleChange
  4 使用 values 提供的值，设置为表单元素的 value，使用 handleChange 设置为表单元素的 onChange
        在给表单元素设置 handleChange 的时候，为了让其生效，需要给表单元素添加 name 属性，并且 name 属性的值与当前 value 名称相同
  5 使用 handleSubmit 设置为表单的 onSubmit
  6 在 handleSubmit 中，通过 values 获取到表单元素值
  7 在 handleSubmit 中，完成登录逻辑
*/

// withFormik 是个高阶组件
export default withFormik({
  // 提供的状态 为表单元素提供状态
  mapPropsToValues: () => ({ username: '', password: '' }),
  // 提供的方法 表单的提交事件
  handleSubmit: async (values, { props }) => {
    console.log(values)
    const { username, password } = values
    const res = await login({
      username,
      password,
    })

    const { status } = res.data

    if (status === 200) {
      // 说明登录通过
      setItem('jjzf_token', res.data.body.token)
      props.history.replace('/my')
      Toast.success('登录成功', 2)
      return
    }
    Toast.info('账号或者密码错误')
  },
})(Login)
