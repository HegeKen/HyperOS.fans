export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zh',
  messages: {
    zh: {
      'home': '首页',
      'devices':'机型',
      'code':'源码',
      'supported':'当前支持的机型：',
      'sitev':'站点版本：',
      'name':'机型名称',
      'log':'更新日志',
      'time':'更新时间：',
      'sitelog':'站点日志',
      'codename':'机型代号',
      'miui':'MIUI固件',
      'recovery':'卡刷包',
      'fastboot':'线刷包',
      'android':'安卓',
      'devinfo':'机型信息',
      'os':'澎湃OS',
      'sources':'数据源',
      'source-code':'源代码',
      'yes':'支持',
      'data':'数据',
      'no':'否',
      'coolapk':'酷安',
      'fixed':'现有方法均已失效，唉。',
      'source':'源代码与数据源',
      'top':'返回顶部',
      'lang':'English',
      'hometitle':'小米澎湃OS, 现已发布',
      'devlist':'小米澎湃OS机型列表',
      'rompage':'澎湃OS官方刷机包下载',
      'yet':'未公布',
      'disclaimerlong':'本网站非小米集团旗下网站 . 我们与小米集团以及HyperOS开发团队没有任何联系',
      'disclaimer':'非小米旗下网站',
      'gotomiui':'，点击前往获取：',
      'miuier':' - MIUI官方ROM仓库',
      'dev':'开发版',
      'supports':'当前支持：',
      'latedev':'最新版本：',
      'update':'近期更新：',
      'devtitle':'开发版更新日志',
      'num':'第',
      'week':'周',
      'download':'下载ROM',
      'uptime':'更新时间：',
      'versions':'更新版本：',
      'comm':'小米社区',
      'gcom':'国际版小米社区',
      'comlink':'社区链接：',
      'description':'▍更新说明',
      'attention':'▍升级提示',
      'logs':'▍更新日志',
      'roms':"▍刷机包",
      'totop':'返回',
      'release':'发布日期',
      'tips':'提速方法',
      'fix403':'修复403提示',
      'method1':'方法一：',
      '1step1':'找到hosts文件或者路由器的hosts编辑页面',
      '1step2-1':'或者',
      '1step2':'往hosts文件中添加以下两个解析记录',
      '1step3':'保存并退出',
      'method2':'方法二：',
      '2step1-1':'点击以下链接进行下载，感谢: ',
      '2step1-2':' 提供脚本',
      '2step2-1':'下载后，解压该文件，双击运行',
      '2step2-2':'脚本，并按步骤进行操作。',
      'bllock':'Bootloader',
      'unlock':'所有线刷都以解锁Bootloader为前提，并且解锁Bootloader时会清除数据，请提前做好备份工作',
      'unlockurl':'点击前往申请',
      'suspended': '▍撤包的ROMs：',
      'note': '注意：',
      'suspendednote': '撤包版本存在极大可能性使得您的设备死机、重启、变砖，请不要轻易尝试，也不要轻易因为别人安装后正常的情况选择安装，因此带来的问题，我站不负任何责任',
    },
    en: {
      'home': 'Home',
      'devices':'Devices',
      'code':'Source',
      'supported':'Available devices:',
      'sitev':'Site version:',
      'sitelog':'Site update logs',
      'name':'Device name',
      'log':'Log',
      'time':'Last Update:',
      'codename':'Codename',
      'miui':'MIUI Rom',
      'devinfo':'Device Info',
      'recovery':'Recovery',
      'fastboot':'Fastboot',
      'android':'Android',
      'os':'HyperOS',
      'yes':'Yes',
      'data':'Data',
      'fixed':'All methods have been fixed, the end.',
      'comm':'Xiaomi Community China',
      'gcom':'Mi Community Global',
      'coolapk':'CoolAPK',
      'download':'Download ROM',
      'source':'Source codes and data sources',
      'top':'Go to top',
      'lang':'中文',
      'no':'No',
      'hometitle':'Xiaomi HyperOS is here.',
      'devlist':'Device list for Xiaomi HyperOS',
      'rompage':'Xiaomi HyperOS Official ROMs for',
      'yet':'N/A',
      'disclaimerlong':'This Website is NOT A Xiaomi Website. We are not affiliated with Xiaomi Corp. or HyperOS Development Team in any way.',
      'disclaimer':'This is NOT a Xiaomi Website',
      'gotomiui':', go to the MIUI site: ',
      'miuier':' - MIUI Official ROMs',
      'dev':'DEV',
      'supports':'currently supports:',
      'latedev':'Latest: ',
      'update':'Latest updates:',
      'devtitle':'DEV changlogs',
      'num':'Week ',
      'week':'',
      'uptime':'Latest update: ',
      'versions':'Versions',
      'comlink':'Community',
      'description':'▍Update description',
      'attention':'▍Attentions',
      'logs':'▍Changelogs',
      'roms':"▍ROMs",
      'totop':'ToTop',
      'release':'Release date',
      'tips':'Speed up tips',
      'fix403':'Fix 403',
      'method1':'Method 1 :',
      '1step1':'Open up the hosts file on your computer or your router settings',
      '1step2-1':'Or',
      '1step2':'And those two lines to the end of the file.',
      '1step3':'Save the file and exit.',
      'method2':'Method 2 :',
      '2step1-1':'Click on the link below to download script, thanks for : ',
      '2step1-2':' for the script.',
      '2step2-1':'After download, unzip it , double click',
      '2step2-2':'and run the script, and follow the instructions.',
      'bllock':'Bootloader',
      'unlock':'You need to unlock the bootloader if you want to flash a rom into your phone via fastboot method, and your data could be deleted as you choose, please make sure you have backed up your personal data.',
      'unlockurl':'Apply for Bootloader Unlock here.',
      'suspended': '▍Suspended ROMs：',
      'note': 'Notes : ',
      'suspendednote': 'Suspended ROMs may affect your device to be end up in boot loop or bricked, so don\'t try it with ease and becuase of some one is using that version is fine , any problem caused by it is under your choice of act and is your responsibility, and we are not responsible for it',
    }
  }
}))
