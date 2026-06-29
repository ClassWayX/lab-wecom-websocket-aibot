# 企业微信长连接机器人实验

# 跳转链接

## 官方文档

[点击跳转企业微信官方文档](https://developer.work.weixin.qq.com/document/path/101463)

## npm

### npm 首页

[点击跳转 `@wecom/aibot-node-sdk` 的 npm 网页链接](https://www.npmjs.com/package/@wecom/aibot-node-sdk)

### npm 官方 Github 仓库

[点击跳转 `https://github.com/WecomTeam/aibot-node-sdk`](https://github.com/WecomTeam/aibot-node-sdk)

# 🛠️ 快速开始

## 1. 环境准备

本地开发需确保已安装 **Docker** 及 **Docker Compose**。

## 2. 配置环境变量

复制环境配置文件模版，并填写对应的环境变量：

```bash
cp .env.example .env
```

关于这写变量的意义可以参考这里：[点击跳转](https://developer.work.weixin.qq.com/document/path/101463#%E8%8E%B7%E5%8F%96%E5%87%AD%E8%AF%81)

## 3. 启动服务

在项目根目录下执行以下命令，构建并完成后端运行：

```bash
docker compose up --build -d
```

## 4. 代码入口

项目的核心初始化与入口逻辑请参考：[`instrumentation.ts`](instrumentation.ts)
