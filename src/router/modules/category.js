import Layout from '@/layout'

const category = [
  { title: 'PHP' },
  { title: 'Mysql' },
  { title: 'HTTP' },
  { title: 'Redis' },
  { title: 'Linux' },
  { title: 'Web' },
  { title: 'Wechat' }
]

const children = []

category.forEach(v => {
  children.push({
    path: v.title,
    name: v.title,
    component: () => import('@/views/home/index'),
    meta: { title: v.title }
  })
})

const categoryRouter = {
  path: '/category',
  component: Layout,
  alwaysShow: true,
  meta: { title: '学海无涯' },
  children
}

export default categoryRouter
