import { sakura } from '@anyfork/vuepress-plugin-sakura-next'
import { bgmMusicPlayer } from '@anyfork/vuepress-plugin-bgm-player-next'

export const plugins = [
  sakura({
    // 设置数量 默认 20
    sakura_num: 6,
    //是否显示，默认：true
    sakura_show: true,
    //层叠z-index值,默认：100
    sakura_zindex: -99,
    sakura_img: '/white.png'
  }),

  // bgmMusicPlayer({
  //   audios: [
  //     {
  //       name: '我再没见过 像你一般的星空',
  //       artist: 'Seto',
  //       url: 'https://assets.smallsunnyfox.com/music/2.mp3',
  //       cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
  //     },
  //     {
  //       name: 'Running up',
  //       artist: 'xiao',
  //       url: 'https://ws.stream.qqmusic.qq.com/C400004ewwlC2ertsX.m4a?guid=5456640&vkey=4270F2E4C92852BF81247181D4C0EFD4CD4A9E9FBD8D944894EE3F3EB3BA84F1731B326AC82A698AF80DD8628B33A3E006A74E95CE9CA3AD&uin=626567678&fromtag=103032',
  //       cover: 'https://pic3.zhimg.com/80/v2-14b1d695debeb668082bfe7f18a06d8f_r.jpg'
  //     }
  //   ],
  //   autoShrink: true,
  //   floatStyle: { bottom: '100px', 'z-index': '999999' },
  //   color: '#4954E6'
  // })
]