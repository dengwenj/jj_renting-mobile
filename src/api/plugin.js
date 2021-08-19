import request from '@utils/request'

// 房屋图像上传
export const houseImg = (data) => {
  return request({
    method: 'POST',
    url: '/houses/image',
    data,
    headers: {
      'Content-type': 'multipart/form-data',
    },
  })
}
