export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zh',
  messages: {
    zh: {
      home: '首页',
      'devices':'机型',
      'code':'源码',
      'supported':'当前支持的机型：',
      'sitev':'站点版本：',
      'name':'机型名称',
      'codename':'机型代号',
      'miui':'是否支持MIUI',
      'recovery':'卡刷包',
      'fastboot':'线刷包',
      'android':'安卓版本',
      'os':'澎湃OS版本',
      'yes':'是',
      'no':'否',
      'hometitle':'小米澎湃OS, 现已发布',
      'devlist':'小米澎湃OS机型列表',
      'rompage':'澎湃OS官方刷机包下载',
      'yet':'未公布'
    },
    en: {
      home: 'Home',
      'devices':'Devices',
      'code':'Source',
      'supported':'Available devices:',
      'sitev':'Site version:',
      'name':'Device name',
      'codename':'Codename',
      'miui':'Supports MIUI',
      'recovery':'Recovery',
      'fastboot':'Fastboot',
      'android':'Android',
      'os':'HyperOS',
      'yes':'Yes',
      'no':'No',
      'hometitle':'Xiaomi HyperOS is here.',
      'devlist':'Device list for Xiaomi HyperOS',
      'rompage':'Xiaomi HyperOS Official ROMs for',
      'yet':'N/A'
    }
  }
}))
