import '@/styles/markdown/markdown.scss'
import Prism from 'prismjs'

const HighLight = {}

HighLight.install = function(Vue) {
  Vue.directive('highlight', function(el) {
    const blocks = el.querySelectorAll('.markdown-body pre code')
    blocks.forEach((block) => {
      Prism.highlightElement(block)
    })
  })
}

export default HighLight
