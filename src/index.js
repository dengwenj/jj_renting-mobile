import React from 'react'
import ReactDOM from 'react-dom'

//导入 antd-mobile 样式
import 'antd-mobile/dist/antd-mobile.css'
import './assets/fonts/iconfont.css'
// 我们自己写的全局样式要放在组件库样式的后面 后面的样式会覆盖前面的样式
// 跟 rem 有关的
import 'lib-flexible'
import 'react-virtualized/styles.css'
import './index.css'
//应该将组件的导入放在样式导入后面，从而避免样式覆盖的问题
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
