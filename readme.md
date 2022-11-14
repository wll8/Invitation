# 婚礼邀请函
手机风格的婚礼邀请函, 前后端全套功能完善, 高可配置性, 便于二开, 部署.

- 前后端技术栈统一, 前端 vue.js, 后端 node.js
- 支持直接通过界面配置, 实现不同作品
- 已经过多人实际使用, 评价很好
- 支持男女版
- 支持祝福管理
- 支持调试模式


示例:
- 测试数据
- 实例应用(已征得同意, 并伪化电话、地址等敏感信息)
  - 黄友应、柯西美
  - 喻沙、

## 页面
- 来电页: 响铃, 接听后进入通话页
- 接听页: 根据男女版播放语音邀约, 点击挂断后进入桌面页
- 桌面页: 有各个图标, 点击后进入各个页面
- 邀请页: 根据男女版显示邀请文字及倒计时
- 通讯页: 可以点击新娘新郎的号码拨打电话
- 微信页: 点击听新娘新郎的另一条语音消息
- 集成页: 有交互式的拍照效果, 然后引导进入邀请页,相册页,祝福页
- 祝福页: 闪烁祝福按钮引导祝福, 以弹幕方式显示祝福
- 相册页: 多张照片组合列表
- 地图页: 可以进行导航功能
- 调试页: 输入密码后, 删除某条祝福, 或进行页面调试

## 开发说明
node v14.15.5, yarn 1.22.19. 前端使用 vue2, less, 后端使用基于 nodejs 的 mockm, 数据使用 json 存储, 无需数据库.


``` sh
# 安装依赖
yarn

# 运行后端开发服务
yarn mm

# 运行前端开发服务
yarn dev

# 部署
# 编译前端代码
yarn build
# 访问编译后的服务
open http://127.0.0.1:9020/love
```

目录结构讲解:
```

```

### todo
- [ ] 全屏花瓣飘落效果
  - 玫瑰花
  - 雪花
  - 樱花
  - 爱心
- [ ] 触碰飘起图案
  - 玫瑰花
  - 雪花
  - 樱花
  - 爱心
- [ ] 邀约页更像邀请函
- [ ] 邀约页文本打字机效果
- [ ] 邀约页倒计时更贴合爱情
- [ ] 图标引导点击
- [ ] 相机页高光聚焦

### 参考
- https://ruanjiafeng2013.gitee.io/confession-page-100/
- https://imagestool.com/zh_CN/compress-images-to-specified-size.html
- https://github.com/GoogleChromeLabs/squoosh
- https://docsmall.com/image-compress
- https://www.tukuaiya.com/
- https://form.lljj.me/schema-generator.html#/index