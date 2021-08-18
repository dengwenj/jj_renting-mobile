import React from 'react'
import BASE_URL from '@utils/url'
import './index.scss'

export default function NotHouse(props) {
  return (
    <div className="not_found">
      <div className="img">
        <img src={BASE_URL + '/img/not-found.png'} alt="" />
      </div>
      <p className="msg">{props.children}</p>
    </div>
  )
}
