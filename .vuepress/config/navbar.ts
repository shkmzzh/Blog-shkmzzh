export default [
  { text: '主页', link: '/' },
  { text: '记录', link: '/categories/article/1/' },
  { text: '标签', link: '/tags/css/1/' },
  {
    text: '学习笔记',
    children: [
      { text: 'HTML5&CSS3', link: '/docs/HtmlCss/froms' },
      { text: 'JavaScript', link: '/docs/JavaScript/jsjichu' },
      { text: 'Ajax&Git', link: '/docs/Ajax_Git/ajax' },
      { text: 'Node', link: '/docs/Node/nodeBase' },
      { text: 'Vue', link: '/docs/Vue/directive' },
    ],
  },
  { text: '留言板', link: '/blogs/message-board' },
]
