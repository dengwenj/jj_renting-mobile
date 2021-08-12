import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
//导入 antd-mobile 样式
import 'antd-mobile/dist/antd-mobile.css'
// 我们自己写的全局样式要放在组件库样式的后面 后面的样式会覆盖前面的样式
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
