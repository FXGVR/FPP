# Git 提交与 Release 规则

## 提交规则

- 提交只包含本次功能、修复或文档更新相关文件。
- 不提交本地生成物、临时资料和导出材料，尤其是 `outputs/`。
- `wechat-mini/` 是微信小程序发布资料目录，只作为仓库内参考资料维护，不作为 GitHub Release 发布资产上传。
- 修改 `index.html`、`styles.css` 或 `app.js` 后，提交前重新运行 `node build-fp.js`，确保 `fpp.html` 已同步更新。
- 如果维护预压缩部署文件，提交前同步更新 `fpp.html.gz`。
- 提交信息使用简洁的 `type: summary` 格式，例如：
  - `feat: improve XR playback panel`
  - `fix: handle video seek state`
  - `docs: update release workflow`
  - `chore: ignore local outputs`

## 版本归档

`OldVersion/` 只保留已经存在的历史快照。新版本归档改用 GitHub Releases，不再新增 `OldVersion/<version>/` 目录。

推荐流程：

1. 在 `main` 完成功能、文档和构建产物更新。
2. 确认 `git status` 中没有 `outputs/` 或其他本地生成物。
3. 提交并推送到 GitHub。
4. 为发布提交创建版本标签，例如 `v1.3.0`。
5. 在 GitHub Releases 中基于该标签创建 release。
6. Release notes 可使用 GitHub 自动生成后再手动补充重点变化。
7. 上传发布资产，仅包括：
   - `fpp.html`
   - `fpp.html.gz`
8. 不上传 `wechat-mini/`、`OldVersion/`、`outputs/`、`test-assets/` 或本地导出资料。
9. 发布后，GitHub 会保留该标签对应的源码包；需要回看旧版本时，优先从 Releases 下载，而不是在仓库内复制旧目录。

可选 CLI 流程：

```sh
git tag v1.3.0
git push origin v1.3.0
gh release create v1.3.0 fpp.html fpp.html.gz --title "v1.3.0" --generate-notes
```

如果还没有安装或登录 GitHub CLI，使用 GitHub 网页端创建 release 即可。
