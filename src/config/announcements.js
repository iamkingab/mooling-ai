     1|// 公告配置文件
     2|export const announcements = [
     3|  {
     4|    id: 'v0.7.0',
     5|    version: '0.7.0',
     6|    title: '🎉 AI小说生成v0.7.0 重大更新',
     7|    date: '2025-01-20',
     8|    priority: 1, // 优先级，数字越大越重要
     9|    content: `
    10|# 🎉 欢迎使用AI小说生成工具 v0.7.0
    11|
    12|## 📚 使用教程
    13|
    14|### 🎬 视频教程
    15|- [API配置教程](https://www.bilibili.com/video/BV1keKgzaER2)
    16|- [本地部署教程](https://www.bilibili.com/video/BV1AYKgzAEne)
    17|
    18|### 💡 快速开始
    19|1. 选择 **墨灵官方API** (推荐新手)
    20|2. 购买API密钥并输入
    21|3. 选择合适的AI模型
    22|
    23|## 🛒 获取API密钥
    24|
    25|点击配置页面的**前往购买**按钮，或访问：
    26|[淘宝购买链接](https://item.taobao.com/item.htm?ft=t&id=938261705242)
    27|
    28|## 💬 技术支持
    29|
    30|遇到问题？加入我们的交流群：**QQ群：468734087**
    31|<img src="../../image/qrcode_1749609318081.jpg" alt="QQ群" style="height: 300px;">
    32|
    33|**微信公众号：**
    34|<img src="../../image/qrcode_for_gh_3e35b4fbecbe_258.jpg" alt="微信公众号" style="width: 200px; height: 200px;">
    35|
    36|
    37|
    38|
    39|## ✨ v0.7.0 更新内容
    40|
    41|### 🔧 API配置优化
    42|- **优化API配置新增官方默认API**: 新增墨灵官方API服务，按次计费，价格透明
    43|- **自定义API配置**: 支持所有OpenAI格式的API接口
    44|- **智能配置向导**: 分为新手和高级用户模式，操作更简单
    45|
    46|### 📢 系统功能增强
    47|- **增加公告弹窗和教程说明**: 新用户引导更完善，使用更简单
    48|- **新增切换模型参数下拉框**: 支持随时切换模型，使用更灵活
    49|
    50|### ✍️ 短文创作全新升级
    51|- **短篇小说改为短文创作**: 功能更全面，支持多种短文类型
    52|- **新增短文写作及配置**: 提供更多创作选项和个性化设置
    53|- **优化短篇小说ui和逻辑**: 界面更美观，操作更流畅
    54|
    55|### 🛠️ 系统优化
    56|- **修复若干bug问题**: 提升系统稳定性和用户体验
    57|
    58|### 🤖 支持的AI模型
    59|- **Claude-4 Sonnet**: ￥0.1/次 - 默认推荐，性能出色
    60|- **Claude Opus 4**: ￥0.5/次 - 顶级性能，创作能力超强
    61|- **Claude-3.7 Sonnet Thinking**: ￥0.2/次 - 具备思维链推理
    62|- **Claude-3.7 Sonnet**: ￥0.1/次 - 经济实用选择
    63|
    64|## 🚀 更多功能
    65|
    66|- **智能章节生成**: AI帮您构思和生成章节内容
    67|- **角色设定助手**: 快速创建丰富的角色设定
    68|- **世界观构建**: 构建完整的小说世界观
    69|- **语料库管理**: 个性化训练素材
    70|- **写作目标跟踪**: 掌控您的创作进度
    71|
    72|---
    73|
    74|**感谢您使用AI小说生成工具！祝您创作愉快！** ✍️
    75|    `
    76|  },
    77|  {
    78|    id: 'v0.6.0',
    79|    version: '0.6.0', 
    80|    title: '🔧 系统优化更新',
    81|    date: '2024-01-15',
    82|    priority: 0,
    83|    content: `
    84|# 📋 系统优化更新 v0.6.0
    85|
    86|## 🛠️ 主要改进
    87|
    88|### 性能优化
    89|- 提升AI生成速度
    90|- 优化界面响应速度
    91|- 减少内存占用
    92|
    93|### 界面改进
    94|- 优化用户体验
    95|- 修复若干界面bug
    96|- 增强移动端适配
    97|
    98|### 功能增强
    99|- 改进文本编辑器
   100|- 增强导入导出功能
   101|- 优化备份管理
   102|
   103|感谢您的使用和反馈！
   104|    `
   105|  }
   106|]
   107|
   108|// 获取最新公告
   109|export function getLatestAnnouncement() {
   110|  return announcements
   111|    .sort((a, b) => b.priority - a.priority)
   112|    .find(announcement => announcement.priority > 0) || announcements[0]
   113|}
   114|
   115|// 获取指定版本的公告
   116|export function getAnnouncementByVersion(version) {
   117|  return announcements.find(announcement => announcement.version === version)
   118|}
   119|
   120|// 检查是否有新版本公告
   121|export function hasNewAnnouncement() {
   122|  const lastReadVersion = localStorage.getItem('lastReadAnnouncementVersion')
   123|  const latestAnnouncement = getLatestAnnouncement()
   124|  
   125|  if (!lastReadVersion) {
   126|    return true
   127|  }
   128|  
   129|  return lastReadVersion !== latestAnnouncement.version
   130|}
   131|
   132|// 标记公告为已读
   133|export function markAnnouncementAsRead(version) {
   134|  localStorage.setItem('lastReadAnnouncementVersion', version)
   135|  localStorage.setItem('lastReadAnnouncementDate', new Date().toISOString())
   136|}
   137|
   138|
   139|
   140|// 获取用户统计信息
   141|export function getAnnouncementStats() {
   142|  return {
   143|    lastReadVersion: localStorage.getItem('lastReadAnnouncementVersion'),
   144|    lastReadDate: localStorage.getItem('lastReadAnnouncementDate')
   145|  }
   146|}