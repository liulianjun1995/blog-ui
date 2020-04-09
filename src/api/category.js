import request from '@/utils/request'

const prefix = '/category'

export function ApiGetCategoryList(params) {
  return request({
    url: prefix + 'list',
    method: 'get',
    params
  })
}
