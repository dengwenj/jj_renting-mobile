import React from 'react'
import './index.scss'

export default function FilterBottom(props) {
  const { qd, qx } = props
  return (
    <div className="bottom">
      <div className="qx">{qx}</div>
      <div className="qd">{qd}</div>
    </div>
  )
}
