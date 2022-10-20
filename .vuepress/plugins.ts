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
                name: '萤火之森',
                artist: 'CMJ',
                url: 'https://assets.smallsunnyfox.com/music/3.mp3',
                cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
            }
        ],
        autoShrink: true,
        floatStyle: { bottom: '100px', 'z-index': '999999' },
        color: '#4954E6'
    })
]