import request from '@/utils/request'

const prefix = '/article/'

export function ApiGetArticleList(params) {
  return request({
    url: prefix + 'list',
    method: 'get',
    params
  })
}

export function ApiGetTopArticleList(params) {
  return request({
    url: prefix + 'tops',
    method: 'get',
    params
  })
}

export function ApiGetHotArticleList(params) {
  return request({
    url: prefix + 'hots',
    method: 'get',
    params
  })
}

export function ApiGetRecommendArticleList(params) {
  return request({
    url: prefix + 'recommends',
    method: 'get',
    params
  })
}

export function ApiGetRandomArticleList(params) {
  return request({
    url: prefix + 'random',
    method: 'get',
    params
  })
}

export function ApiGetTopArticleDetail(id) {
  return request({
    url: prefix + `${id}/detail`,
    method: 'post'
  })
}
