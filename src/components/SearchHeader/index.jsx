import React from 'react'
import { Flex } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './index.scss'
import '@assets/fonts/iconfont.css'

function SearchHeader(props) {
  const { cityInfo } = props
  return (
    <div>
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
}

// 给 props 设置校验
SearchHeader.propTypes = {
  cityInfo: PropTypes.string.isRequired,
}

export default withRouter(SearchHeader)
