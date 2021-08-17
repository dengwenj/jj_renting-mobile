import React, { Component } from 'react'
import { Modal } from 'antd-mobile'
import HosueItem from '@components/HosueItem'
import './index.scss'

export default class Popup extends Component {
  // 让弹出框关闭
  onClose = () => {
    this.props.onClose(false)
  }
  fContent = () => {
    const { content } = this.props
    // 封装到组件里面去了
    return <HosueItem content={content} />
  }
  render() {
    const { modal } = this.props

    return (
      <div>
        <Modal
          className="modal"
          // 是否弹窗模式
          popup
          // 是否显示关闭按钮
          closable
          // visible 对话框是否可见
          visible={modal}
          // 点击 x 或 mask 回调
          onClose={this.onClose}
          animationType="slide-up"
        >
          <div className="xm">
            <div className="top">
              <div className="title">房屋列表</div>
              <div className="gdfy">更多房源</div>
            </div>
            {this.fContent()}
          </div>
        </Modal>
      </div>
    )
  }
}
