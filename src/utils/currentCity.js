import { getItem, setItem } from './storage'
import { cityInfo } from '@api/area'

// 1 创建并导出获取定位城市的函数 getCurrentCity
export default function getCurrentCity() {
  // 2 判断 本地存储中有没有定位城市
  // 因为这里是异步的 又想要数据暴露出去所以用 Promise 也可以用原始的回调函数，形参接收一个回调函数，然后调用，把数据暴露出去
  const storage = getItem('jjzf')
  if (!storage) {
    return new Promise((resolve, reject) => {
      try {
        // 3 如果没有，就使用首页中获取定位城市的代码来获取，并且存储到本地存储中，然后返回该城市数据
        // 通过 IP 定位 获取到当前城市的名称
        const currentCity = new window.BMapGL.LocalCity()
        currentCity.get(async (res) => {
          const res1 = await cityInfo(res)
          setItem('jjzf', res1.data.body)
          resolve(res1.data.body)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  // 如果有，直接返回本地存储的城市数据
  // 因为上面为了处理异步操作，使用了 Promise，因此，为了该函数返回值的统一，此处一返回 Promise
  // 因为这里不会失败，返回一个成功的 Promise 就行了
  return Promise.resolve(getItem('jjzf'))
}
