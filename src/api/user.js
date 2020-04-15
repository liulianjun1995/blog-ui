import request from '@/utils/request'

const prefix = '/user/'

export function getInfo() {
  return request({
    url: prefix + 'info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: prefix + 'logout',
    method: 'post'
  })
}
