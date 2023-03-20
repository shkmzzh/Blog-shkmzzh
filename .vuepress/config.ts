import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import sidebar from './config/sidebar'
import nav from './config/navbar'
import { plugins } from './config/plugins'
import { randomAvater } from './config/randomAvatar'
console.log(randomAvater)


export default defineUserConfig({
  title: 'Xiao〰xiao ? !',
  description: 'Just playing around',
  // base: './',
  // 打包文件夹名
  dest: '../shkmzzh/dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: 'Xiao〰xiao ? !',
    authorAvatar: randomAvater,
    randomAvater,
    docsRepo: 'https://github.com/vuepress-reco/vuepress-theme-reco-next',
    docsBranch: 'main',
    docsDir: 'example',
    lastUpdatedText: '',
    // 导入侧边栏
    series: sidebar,
    // 导入标题栏
    navbar: nav,
    commentConfig: {
      type: 'valine',
      options: {
        appId: '9tl3j59Ega3LWOlRIJdFGmSD-gzGzoHsz', // your appId
        appKey: 'tf5LIgpfywfJ8relOu7eiCdy', // your appKey
        hideComments: true // 全局隐藏评论，默认 false
      }
    }
  }),
  // debug: true,
  plugins: plugins
})
