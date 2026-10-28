# Matvey Wang 个人学术主页

基于 Astro + TypeScript + 原生 CSS 的纯静态网站。默认英文，无数据库、后端、外部字体或大型 UI 框架。支持系统暗色主题及手动切换。目标网址：<https://matveywang.github.io/>。

## 本地运行

使用 Node.js 24 LTS（项目开发时为 24.15.0），在仓库根目录执行：

```bash
npm ci
npm run dev
```

打开终端显示的本地地址（通常是 `http://localhost:4321`）。预览生产构建：

```bash
npm run verify
npm run preview
```

`verify` 依次执行 Astro/TypeScript 检查、静态构建及产物检查，验证页面、站内链接、图片、标题和 metadata。输出目录为 `dist/`，不要手动编辑。首次安装使用 `npm install`；后续使用已提交的 `package-lock.json` 和 `npm ci` 重现依赖。

## 文件结构

```text
src/data/profile.ts          姓名、机构、简介、教育、研究方向、联系方式、CV
src/data/content.ts          论文、项目、动态；带 TypeScript 类型
src/pages/                   七个页面、404、robots.txt、sitemap.xml
src/components/              论文列表、动态列表、资源链接
src/layouts/Layout.astro     导航、页脚、SEO、主题切换
src/styles/global.css        共享配色、排版、响应式样式
public/images/               头像、论文和项目缩略图
public/                     简历 PDF 等静态文件
.github/workflows/deploy.yml GitHub Pages 自动部署
index.html                  旧站原始文件，原样保留；不进入新版构建
```

## 修改个人信息

编辑 `src/data/profile.ts`。姓名来自旧站，博士生身份按本次需求设置；尚未提供的机构、院系、研究兴趣、教育经历和联系方式均为清晰占位。请在正式使用前核实并替换。

- `name`、`role`、`institution`、`department`、`location`：基础信息。
- `introduction`：首页介绍；`biography`：About 段落数组，填写后把 `biographyIsPlaceholder` 改为 `false`。
- `interests`：研究兴趣；`research`：Research 页面方向数组。
- `education`：教育条目；填写真实内容后设 `placeholder: false`。
- `email`：填入真实邮箱后首页自动出现 `mailto:` 链接。
- `links.github`、`links.scholar`、`links.orcid`：填写完整链接。留空时显示 “To be added”，不生成无效链接。

英文配置统一在 `profile` 中，`locale` 为 `en`。未来可增加独立的 `profileZh` 与翻译字典，再增加 `src/pages/zh/` 路由及语言切换；目前不显示尚未实现的语言按钮。

## 替换头像和缩略图

将头像放到 `public/images/portrait.jpg`，设置：

```ts
avatar: '/images/portrait.jpg',
avatarAlt: 'Portrait of Matvey Wang',
avatarIsPlaceholder: false,
```

建议头像使用约 600 px 的 JPG/WebP，主体居中。所有资源路径从 `/` 开始，例如 `/images/paper-figure.webp`，不要带 `public/` 或仓库名称。图片应压缩并提供准确的 `thumbnailAlt`。旧仓库只有 `index.html`，其引用的 `images/*`、`assets/*` 和旧项目页面未提交，无法恢复这些缺失文件；没有删除原有照片。已有旧内容完整保留在根目录 `index.html`，也可从备份分支查看。

## 添加论文

在 `src/data/content.ts` 的 `publications` 数组中添加对象，无需改页面：

```ts
{
  id: 'unique-paper-id',
  title: '填写真实论文标题',
  authors: ['作者一', '作者二'],
  venue: '真实会议或期刊',
  year: 2026,
  summary: '填写研究问题、方法与结果。',
  thumbnail: '/images/paper-figure.webp',
  thumbnailAlt: '描述图中实际展示的内容',
  links: { paper: '', code: '', project: '' },
  placeholder: false,
}
```

论文自动按年份降序分组，首页显示最新三篇。缩略图可省略，未填写的资源链接自动隐藏；有链接时分别显示 Paper、Code、Project。`id` 使用唯一的英文标识。示例论文标题、作者、年份、会议均不代表真实成果，可直接删除整个示例对象。

## 添加项目和动态

在 `projects` 数组添加包含 `id`、`title`、`category`、`description`、`tags`、`links` 的对象。可选 `thumbnail`、`thumbnailAlt`，真实项目使用 `placeholder: false`。项目按数组顺序显示。

在 `updates` 数组添加：

```ts
{ date: '2026-10-28', text: '填写真实动态内容。', url: '', placeholder: false }
```

日期必须为有效的 `YYYY-MM-DD`，动态自动按日期倒序，首页显示最新三条。`url` 可省略。现有示例日期和内容有占位标签，不代表真实事件。清空数组时列表页会显示空状态。

## 上传简历

把真实 PDF 放到 `public/cv.pdf`，将 `profile.cv` 改为：

```ts
cv: { url: '/cv.pdf', updated: '2026-10' },
```

CV 页面自动显示下载按钮。未提供真实简历前显示 “PDF to be added”，不放置虚假 PDF 或产生 404 的下载链接。

## 部署到 GitHub Pages

1. 审阅本地改动，核实个人信息，执行 `npm run verify`。
2. 在 GitHub 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。确保仓库允许 Actions 运行。
3. 自行提交并推送到 `main`（本次开发不会替你推送）：

   ```bash
   git add .github .gitignore astro.config.mjs package.json package-lock.json tsconfig.json src public scripts README.md
   git commit -m "Build static academic homepage with Astro"
   git push origin main
   ```

4. 在 Actions 查看 `Deploy academic homepage`，等待 build、deploy 成功。也可通过 Actions 的 Run workflow 手动触发。
5. 访问 <https://matveywang.github.io/>，检查二级页面直接访问和刷新。每次推送 `main` 后都会重新部署。

`astro.config.mjs` 已设置 `site: 'https://matveywang.github.io'`、静态输出和目录形式路由；用户名主页仓库无需配置 `base`。工作流使用 Node 24、`npm ci` 和质量检查，上传 `dist/` 后通过 GitHub 官方 Pages Actions 部署。无需付费服务。

部署配置参考 [Astro 官方 GitHub Pages 文档](https://docs.astro.build/en/guides/deploy/github/)。

## 常见故障

- **首页仍是旧版本**：确认 Pages Source 为 GitHub Actions，查看 Actions 是否成功；等待 CDN 更新并强制刷新浏览器。
- **图片或 PDF 404**：检查文件是否确实位于 `public/`、已提交，路径是否从 `/` 开始，大小写是否一致。GitHub Linux 环境区分大小写。
- **二级页面 404**：确认上传的是完整 `dist/`；使用 `/about/` 等链接，不配置仓库子路径 `base`。
- **部署权限失败**：检查 Pages 已启用、Actions 权限和 `github-pages` environment 的分支策略；工作流已有 `pages: write`、`id-token: write`。
- **依赖或版本报错**：确认 Node 24，执行 `npm ci`。更新依赖后需一起提交 `package.json` 和锁文件。
- **网络失败**：检查 npm/Git 的代理配置后重试，不要把个人代理或凭据写入仓库。
- **新内容没出现**：检查修改的是数据数组、字段类型正确，并重新构建部署；示例占位标签由 `placeholder` 控制。
- **主题切换不可用**：无 JavaScript 时仍跟随系统主题；浏览器禁止存储时可切换，但刷新后跟随系统。

## 保留与回退

修改前主分支为 `d130c4b`，已创建本地 `backup/pre-astro-20261028` 分支。根目录旧 `index.html` 未改动。备份分支未推送；可以用 `git show backup/pre-astro-20261028:index.html` 查看原文。需要恢复线上版本时，先另建工作分支检查备份，再自行选择回退方案，避免丢弃后续工作。

## 可访问性与日常维护

提供语义化标题、图片替代文字、跳转正文链接、键盘焦点、当前导航状态及减少动态偏好支持。移动端导航自动换行，无需折叠菜单脚本。每次内容更新建议运行 `npm run verify`，并检查手机宽度、深浅主题、导航与实际外部资源链接。
