import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default function Sticky(props) {
  /* 
    1 在 FindHouse 页面中，导入 Sticky 组件
    2 使用 Sticky 组件包裹要实现吸顶功能的 Filter 组件
    3 在 Sticky 组件中，创建两个 ref 对象（placeholder，content）分别指向占位元素和内容元素
    4 组件中，监听浏览器的 scroll 事件（注意销毁事件）
    5 在 scroll 事件中，通过 getBoundingClientRect() dom对象的方法 方法得到筛选栏占位元素当前位置（top）
    6 判断 top 是否小于 0 （是否在可视区内）
    7 如果小于，就添加需要吸顶样式（fixed），同时设置占位元素高度
    8 否则，就移除吸顶样式，同时让占位元素高度为0

    这里面用的 dom 的方法
  */

  // 这样就 通用了 只需要你 props 传进来就行了 不需要写死了
  // const { height } = props

  // 占位元素
  const placeHolder = useRef()
  // 内容元素
  const content = useRef()

  // 占位的元素的处理事件
  const handlePlaceHolder = () => {
    // // 获取 dom 对象
    // const placeHolderEl = placeHolder.current
    // const contentEl = content.current
    // const { top } = placeHolder.current.getBoundingClientRect()
    // console.log()
    // // 判断 top
    // if (top < 0) {
    //   // 吸顶
    //   contentEl.classList.add('fixed')
    //   placeHolderEl.style.height = '${height}px'
    //   return
    // }
    // contentEl.classList.remove('fixed')
    // placeHolderEl.style.height = '0px'
  }

  // 监听浏览器的 scroll 事件（注意销毁事件）
  useEffect(() => {
    window.addEventListener('scroll', handlePlaceHolder)
    return () => {
      window.removeEventListener('scroll', handlePlaceHolder)
    }
  }, [])

  return (
    <div>
      {/* 占位元素 */}
      <div ref={placeHolder}></div>
      {/* 内容元素 */}
      <div ref={content}>{props.children}</div>
    </div>
  )
}

Sticky.propTypes = {
  height: PropTypes.number.isRequired,
}
