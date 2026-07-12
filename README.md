# HyperOS.fans

> 一个为小米全新操作系统 HyperOS 打造的非官方爱好者网站。

HyperOS (小米澎湃 OS) 是基于 Android™ 和 Xiaomi Vela (基于 NuttX 的 IoT OS) 融合构建的"人车家全生态"操作系统。本站旨在为爱好者提供最新的 ROM 动态以及相关资源。

## ✨ 特性

- 🚀 **基于 Nuxt 4 构建**：利用 Vue 3 和 Vite 提供极速的开发体验和卓越的性能。
- 📱 **响应式设计**：完美适配桌面端和移动端，无论在何处都能获得良好的浏览体验。
- 🎨 **现代化 UI**：简洁大气的界面设计，专注于内容阅读。
- ⚡️ **SEO 优化**：内置服务端渲染 (SSR)，提升搜索引擎收录效果。
- 🌍 **国际化支持**：内置 i18n，支持中文和英文切换。
- 📊 **ROM 更新追踪**：自动获取和展示小米/Redmi/POCO 设备的 HyperOS ROM 更新信息。

## � 项目结构

```
HyperOS.fans/
├── app/                    # Nuxt 4 前端应用
│   ├── components/         # Vue 组件
│   ├── composables/        # 组合式函数
│   ├── pages/              # 页面路由
│   ├── plugins/            # Nuxt 插件
│   └── assets/             # 静态资源
├── public/
│   ├── data/               # ROM 数据（Git 子模块）
│   │   ├── scripts/        # Python 数据采集脚本
│   │   ├── devices/        # 设备信息 JSON
│   │   ├── dev/            # 开发版周报数据
│   │   └── assets/         # 设备图标
│   └── vMDUI/              # 移动端 MDUI 版本
├── server/                 # 服务端 API
├── i18n/                   # 国际化配置
└── nuxt.config.ts          # Nuxt 配置
```

### 三层架构

1. **Nuxt 前端**：基于 Vue 3 + Vuetify 的应用，负责展示 ROM 信息和用户交互。
2. **Python 数据管道**：位于 `public/data/scripts/`，定期从小米服务器抓取 ROM 更新信息。
3. **静态数据**：`public/data/` 目录作为 Git 子模块（HyperData），存储设备列表、ROM 版本等 JSON 文件。

## �🛠️ 技术栈

本项目主要使用以下技术：

- [Nuxt 4](https://nuxt.com/) - Vue.js 全栈框架
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集，提供类型安全
- [Vuetify](https://vuetifyjs.com/) - 功能强大的 Vue 组件框架
- [Vite](https://vitejs.dev/) - 下一代前端开发与构建工具
- [Python](https://python.org/) - 数据采集脚本语言

## 📦 安装与使用

### 环境要求

请确保您的开发环境已经安装以下工具：

- [Node.js](https://nodejs.org/) (推荐 v18 或更高版本)
- [pnpm](https://pnpm.io/) (推荐作为包管理器)
- [Python 3](https://python.org/) (如需运行数据采集脚本)

### 获取代码

由于项目包含 Git 子模块，需要使用 `--recursive` 参数克隆：

```bash
git clone --recursive https://github.com/HegeKen/HyperOS.fans.git
cd HyperOS.fans
```

如果已克隆但未初始化子模块：

```bash
git submodule update --init --recursive
```

### 安装依赖

```bash
pnpm install
```

### 开发模式

启动本地开发服务器 (通常运行在 http://localhost:3000):

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 生成静态站点

```bash
pnpm generate
```

## 🔄 更新框架

为了保持 Nuxt 框架及相关依赖的最新状态，您可以运行以下命令进行升级：

```bash
pnpm nuxi upgrade
```

## 🤝 贡献

欢迎任何形式的贡献！如果您发现了 Bug 或者有新功能的建议，请随时提交 Issue 或 Pull Request。

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📮 联系方式

如果您有任何问题，欢迎通过以下方式联系：

- 提交 [Issue](https://github.com/HegeKen/HyperOS.fans/issues)
- 发送邮件至: hegeken#foxmail.com

## ⚠️ 免责声明

本网站为非官方粉丝站点，内容仅代表作者观点，与小米公司无关。HyperOS 及相关商标归小米公司所有。
