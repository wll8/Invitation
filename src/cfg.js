export default {
  video: '', // 视频
  photos: [ // 相册，建议尺寸axb
    'img1',
    'img2',
  ],
  pageImg: [ // 页面背景图片，为空时显示渐变背景色
    {call: ''}, // 首页(来电页)
    {talk: ''}, // 电话接听页
    {desktop: ''}, // 桌面
    {integrated: ''}, // 日期
    {photos: ''}, // 相册
    {map: ''}, // 地图
  ],
  paegMp3Base: '', // 默认背景音乐
  paegMp3: [ // 页面背景音乐， 为空时为默认音乐
    {call: ''}, // 首页(来电页)
    {talk: ''}, // 电话接听页
    {desktop: ''}, // 桌面
    {integrated: ''}, // 日期
    {photos: ''}, // 相册
    {map: ''}, // 地图
  ],
  date: { // 宴席日期
    boy: '',
    girl: '',
  },
  voice: { // 来电语音
    boy: '',
    girl: '',
  },
  addr: { // 地图显示的地址
    boy: {
      name: '大方县六龙镇青林村十二组',
      position: [105.6988000000, 27.1438900000],
    },
    girl: {
      name: '大方县凤山乡店子村徐家寨组',
      position: [105.7145410000, 27.2059230000],
    },
  }
}
