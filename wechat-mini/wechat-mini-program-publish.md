# FXGVR fpp.html 微信小程序发布说明

FXG Video tech 2026(c) 西顾视频科技有限公司

版本：1.0
日期：2026-06-10

## 结论

`fpp.html` 不建议改写成微信小程序原生页面。最稳妥、成本最低的方案，是做一个很薄的微信小程序外壳，用微信小程序 `web-view` 组件打开已经部署到 HTTPS 业务域名上的 `fpp.html`。

推荐结构：

```text
微信小程序页面
  -> web-view
    -> https://your-domain.com/fpp.html?URL=...&projection=...&isMute=true&isLoop=true
```

这样可以继续复用现有播放器能力，包括 URL 参数、投影格式、静音自动播放、循环播放和单文件部署。

## 发布前提

1. 需要一个微信小程序账号，建议使用企业主体。
2. 需要把 `fpp.html` 部署到公网 HTTPS 域名。
3. 需要在微信公众平台后台配置该 HTTPS 域名为小程序业务域名。
4. 视频、图片资源也建议放在 HTTPS 域名下，并确保服务器允许浏览器跨域加载媒体。

注意：微信小程序 `web-view` 对主体类型和域名有要求。个人主体通常不能使用 `web-view` 承载普通网页，实际限制以微信公众平台后台和官方文档为准。

## 操作步骤

### 1. 部署 fpp.html

把当前生成好的 `fpp.html` 上传到你的服务器，例如：

```text
https://vh.fxgvr.com/fpp.html
```

建议先在普通手机浏览器里验证：

```text
https://vh.fxgvr.com/fpp.html?URL=https%3A%2F%2Fvh.fxgvr.com%2Fshows%2FMuguiying%2F1103%E6%88%8F%E6%9B%B2Demo.mp4&projection=VR1803D&isMute=true&isLoop=true
```

确认内容能播放、投影格式正确、静音和循环符合预期。

### 2. 配置业务域名

进入微信公众平台：

```text
设置 -> 开发设置 -> 业务域名
```

添加播放器所在域名，例如：

```text
vh.fxgvr.com
```

微信后台通常会要求下载校验文件，并上传到网站根目录。完成后点击校验，校验通过后，小程序的 `web-view` 才能打开这个域名下的网页。

### 3. 创建小程序页面

在小程序项目中新增页面，例如：

```text
pages/player/player
```

`pages/player/player.wxml`：

```xml
<web-view src="{{url}}"></web-view>
```

`pages/player/player.js`：

```js
Page({
  data: {
    url: ''
  },

  onLoad(query) {
    const mediaUrl = query.url || 'https://vh.fxgvr.com/shows/Muguiying/1103%E6%88%8F%E6%9B%B2Demo.mp4'
    const projection = query.projection || 'VR1803D'
    const playerUrl = [
      'https://vh.fxgvr.com/fpp.html',
      '?URL=', encodeURIComponent(mediaUrl),
      '&projection=', encodeURIComponent(projection),
      '&isMute=true',
      '&isLoop=true'
    ].join('')

    this.setData({ url: playerUrl })
  }
})
```

`app.json` 中注册页面：

```json
{
  "pages": [
    "pages/player/player"
  ],
  "window": {
    "navigationBarTitleText": "FXGVR 媒体播放器"
  }
}
```

### 4. 传入不同媒体

可以通过小程序页面路径传参：

```text
pages/player/player?url=https%3A%2F%2Fvh.fxgvr.com%2Fpublish%2FLVKE%2Fmain4_OU.jpg&projection=VR3603D
```

页面内部会把 `url` 和 `projection` 转换成 `fpp.html` 参数。

常用参数：

```text
URL             媒体地址，支持图片或视频
projection      投影提示或强制投影，例如 VR1803D、VR1802D、ERP、VR3603D
fullscreen      浏览器环境下尝试全屏，微信 web-view 内不建议依赖
isMute          默认 true，利于自动播放；isMute=false 可显式关闭
isLoop          默认 true，isLoop=false 可显式关闭循环
```

## 需要注意的限制

### 本地文件能力

桌面浏览器里的“打开本地文件”和“拖拽播放”能力，在微信小程序 `web-view` 里不能作为核心功能依赖。小程序移动端没有桌面拖拽场景，文件选择能力也会受到微信 WebView 限制。

更适合微信小程序的方式是：

```text
小程序选择媒体 -> 上传服务器 -> 生成 HTTPS URL -> 传给 fpp.html 播放
```

### 自动播放

移动端浏览器通常限制非静音自动播放。当前播放器默认 `isMute=true`，这是正确策略。用户需要声音时，可以让用户在画面上手动关闭静音。

### WebXR

WebXR 在微信小程序 `web-view` 中不应作为核心能力承诺。它取决于微信内置浏览器、系统版本、设备和权限策略。Quest、Chrome 等专门浏览器通常更可靠。

### CORS

URL 视频或图片要作为 WebGL 纹理使用时，服务器需要允许跨域访问。建议媒体服务器返回类似：

```text
Access-Control-Allow-Origin: *
```

如果服务器不允许跨域，视频可能能直接播放，但不能上传到 WebGL 纹理，播放器会显示相关错误。

## 审核前检查清单

1. `fpp.html` 已部署到 HTTPS。
2. 小程序后台已经配置业务域名，并校验通过。
3. 小程序 `web-view` 能打开播放器页面。
4. 目标视频和图片 URL 都是 HTTPS。
5. 服务器允许媒体跨域访问。
6. 默认参数使用 `isMute=true`，保证移动端自动播放成功率。
7. 不把 WebXR 作为微信小程序审核说明中的核心功能。
8. 在微信开发者工具、iOS 微信、Android 微信上分别测试播放。

## 推荐上线方案

第一阶段：

```text
web-view 外壳 + HTTPS fpp.html + URL 参数播放
```

这是最快可上线方案，改动少，风险低。

第二阶段：

```text
增加媒体列表、分享入口、微信登录、服务器上传转码
```

这一步适合把产品做成真正的小程序服务。

第三阶段：

```text
评估是否需要小程序原生 WebGL 播放器
```

只有在 `web-view` 体验或审核限制影响业务时，才建议投入重写原生小程序播放器。
