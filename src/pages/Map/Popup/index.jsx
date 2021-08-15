import React, { Component } from 'react'
import { Modal } from 'antd-mobile'
import './index.scss'

export default class Popup extends Component {
  // 让弹出框关闭
  onClose = () => {
    this.props.onClose(false)
  }
  fContent = () => {
    const { content } = this.props
    return content.map((item) => {
      return (
        <div className="content" key={item.houseCode}>
          <div className="tipian">
            <img
              src={
                content.length === 0
                  ? ''
                  : `http://localhost:8080${item.houseImg}`
              }
              alt=""
            />
          </div>
          <div className="right">
            <div className="desc">{item.title}</div>
            <div className="t">{item.desc}</div>
            <div className="tags">
              {item.tags.map((item1) => {
                return <span key={item1}>{item1}</span>
              })}
            </div>
            <div className="pirce">{item.price}元/月</div>
          </div>
        </div>
      )
    })
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
