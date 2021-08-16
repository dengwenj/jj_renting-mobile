import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default function FilterBottom(props) {
  const { qd, qx, qxClick, qdClick } = props

  return (
    <div className="bottom">
      <div className="qx" onClick={qxClick}>
        {qx}
      </div>
      <div className="qd" onClick={qdClick}>
        {qd}
      </div>
    </div>
  )
}

FilterBottom.propTypes = {
  qd: PropTypes.string,
  qx: PropTypes.string,
  qxClick: PropTypes.func,
  qdClick: PropTypes.func,
}
