import React from 'react'
import BASE_URL from '@utils/url'
import PropTypes from 'prop-types'
import './index.scss'

export default function HosueItem({ content, onClick }) {
  return content.map((item, index) => {
    return (
      <div className="content" key={index} onClick={onClick}>
        <div className="tipian">
          <img
            src={content.length === 0 ? '' : BASE_URL + item.houseImg}
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

HosueItem.propTypes = {
  content: PropTypes.array.isRequired,
  onClick: PropTypes.func,
}
