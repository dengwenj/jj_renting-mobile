// 把 TabBar 每一项抽离出来 不在那里面写 用遍历 不然重复代码很多
const tabBarItem = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home',
  },
  {
    title: '找房',
    icon: 'icon-findHouse',
    path: '/findhouse',
  },
  {
    title: '资讯',
    icon: 'icon-infom',
    path: '/news',
  },
  {
    title: '我的',
    icon: 'icon-my',
    path: '/my',
  },
]
export default tabBarItem
