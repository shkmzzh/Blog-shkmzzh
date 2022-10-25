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

  bgmMusicPlayer({
    audios: [
      {
        name: '我再没见过 像你一般的星空',
        artist: 'Seto',
        url: 'https://assets.smallsunnyfox.com/music/2.mp3',
        cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
      },
      {
        name: 'Running up',
        artist: 'xiao',
        url: 'https://ws.stream.qqmusic.qq.com/C400004ewwlC2ertsX.m4a?guid=640719&vkey=2C1C27EBB9E68C921ADED0218B19DD7844E11C4AF301B4E30CA9761D2AAF6828F670D1EF368B2526DCDD4B0DCC48D3F4A03687628F2CF9DE&uin=626567678&fromtag=103032',
        cover: 'https://img-blog.csdnimg.cn/35f28bba1e34402987893f9adb7f28e5.jpeg'
      }
    ],
    autoShrink: true,
    floatStyle: { bottom: '100px', 'z-index': '999999' },
    color: '#4954E6'
  })
]