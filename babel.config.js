module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ['prismjs', {
      'languages': ['javascript', 'css', 'markup', 'php', 'shell'],
      'plugins': ['line-numbers'],
      'theme': 'okaidia',
      'css': true
    }]
  ]
}
