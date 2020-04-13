import Layout from '@/layout/index'

const category = [
  { title: 'PHP' },
  { title: 'Mysql' },
  { title: 'HTTP' },
  { title: 'Redis' },
  { title: 'Linux' },
  { title: 'Web' },
  { title: 'Wechat' }
]

const articleRouter = {
  path: '/article',
  component: Layout,
  redirect: '/article/all',
  meta: { title: '学海无涯' },
  children: [
    {
      path: 'all',
      name: 'ArticleAll',
      component: () => import('@/views/article/list'),
      meta: { title: '所有文章', routerKey: 'ArticleList' },
      hidden: false
    },
    {
      path: ':id',
      name: 'ArticleDetail',
      component: () => import('@/views/article/detail'),
      meta: { activeMenu: '/article/all', routerKey: 'ArticleDetail' },
      hidden: true
    }
  ]
}

category.forEach(v => {
  articleRouter.children.push({
    path: 'category/' + v.title,
    name: v.title,
    component: () => import('@/views/article/list'),
    meta: { title: v.title, routerKey: 'ArticleList' }
  })
})

export default articleRouter
