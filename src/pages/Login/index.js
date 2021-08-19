import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { Link } from 'react-router-dom'

import NavHeader from '@components/NavHeader'

import styles from './index.module.css'

import { login } from '@api/user'

import { setItem } from '@utils/storage'

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,10}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

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

  /* 
    简化表单处理
      1 导入 Form 组件，替换 form 元素，去掉 onSubmit
      2 导入 Field 组件，替换 input 表单元素，去掉 onChange、onBlur、value
      3 导入 ErrorMessage 组件，替换原来的错误消息逻辑代码
      4 去掉所有 props
  */

  render() {
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <Form>
            <div className={styles.formItem}>
              <Field
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            <ErrorMessage
              className={styles.error}
              component="div"
              name="username"
            />

            <div className={styles.formItem}>
              <Field
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            <ErrorMessage
              className={styles.error}
              component="div"
              name="password"
            />

            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </Form>
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
基本使用
  1 导入 withFormik，使用 withFormik 高阶组件包裹 Login 组件
  2 为 withFormik 提供配置对象：mapPropsToValues 和 handleSubmit
  3 在 Login 组件中，通过 props 获取到 values（表单元素对象），handleSubmit，handleChange
  4 使用 values 提供的值，设置为表单元素的 value，使用 handleChange 设置为表单元素的 onChange
        在给表单元素设置 handleChange 的时候，为了让其生效，需要给表单元素添加 name 属性，并且 name 属性的值与当前 value 名称相同
  5 使用 handleSubmit 设置为表单的 onSubmit
  6 在 handleSubmit 中，通过 values 获取到表单元素值
  7 在 handleSubmit 中，完成登录逻辑
*/

/* 
表单验证
  1 在 withFormik 中添加配置项 validationSchema，使用 Yup 添加表单验证规则
  2 在 Login 组件中，通过 props 获取到 errors（错误信息）和 touched（是否访问过，注意：需要给表单元素添加（是否访问过，注意：需要给表单元素添加 handleBlur 处理失焦点事件才生效）
  3 在表单元素中通过这两个对象展示表单校验错误信息
*/

// withFormik 是个高阶组件
export default withFormik({
  // 提供的状态 为表单元素提供状态
  mapPropsToValues: () => ({ username: '', password: '' }),

  // 表单验证
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required('账号为必填项')
      .matches(REG_UNAME, '长度为5到10位，只能出现数字、字母、下划线 '),
    password: Yup.string()
      .required('密码为必填项')
      .matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线 '),
  }),

  // 提供的方法 表单的提交事件
  handleSubmit: async (values, { props }) => {
    const { username, password } = values
    const res = await login({
      username,
      password,
    })

    const { status } = res.data

    if (status === 200) {
      // 说明登录通过
      setItem('jjzf_token', res.data.body.token)

      /* 
         修改登录成功跳转
             1 登录成功后，判断是否需要跳转到用户要想访问的页面（判断 props.location.state 是否有值）
             2 如果不需要（没有值）则直接调用 history.go(-1) 返回上一页
             3 如果需要，就跳转到 from.pathname 指定的页面（推荐使用 replace）
      */
      if (props.location.state)
        return props.history.replace(props.location.state.from.pathname)
      props.history.replace('/my') // 没有值

      Toast.success('登录成功', 2)
      return
    }
    Toast.info('账号或者密码错误')
  },
})(Login)
