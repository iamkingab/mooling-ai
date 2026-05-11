# 🚀 墨灵部署指南

## 📦 方式一：本地开发

```bash
# 1. 克隆项目
git clone https://github.com/iamkingab/mooling-ai.git
cd mooling-ai

# 2. 安装依赖
npm install
# 或使用 pnpm（推荐）
pnpm install

# 3. 启动开发服务器
npm run dev
# 访问 http://localhost:7520
```

## 🌐 方式二：静态部署（推荐）

### 构建生产版本

```bash
# 构建
npm run build

# 构建产物在 dist/ 目录
```

### 部署到 GitHub Pages

```bash
# 1. 安装 gh-pages
npm install -g gh-pages

# 2. 构建并部署
npm run build
gh-pages -d dist
```

### 部署到 Vercel（免费）

1. 访问 [vercel.com](https://vercel.com)
2. 导入 GitHub 仓库
3. 自动部署完成

### 部署到 Netlify（免费）

1. 访问 [netlify.com](https://netlify.com)
2. 拖拽 `dist` 文件夹即可

## 📱 方式三：打包成手机 APP

### 使用 Capacitor

```bash
# 1. 安装 Capacitor
npm install @capacitor/core @capacitor/cli

# 2. 初始化
npx cap init 墨灵 com.yourname.mooling

# 3. 添加平台
npx cap add android
npx cap add ios

# 4. 构建并同步
npm run build
npx cap copy

# 5. 打开 IDE
npx cap open android  # Android Studio
npx cap open ios      # Xcode
```

## 💰 方式四：卖 Token（推荐）

### 步骤

1. **部署到服务器**
   ```bash
   # 使用 Docker
   docker run -d -p 80:80 --name mooling-ai nginx
   # 将 dist 目录复制到容器
   docker cp dist/. mooling-ai:/usr/share/nginx/html
   ```

2. **配置 API 代理**
   ```nginx
   # nginx.conf
   location /api/ {
       proxy_pass https://api.openai.com/;
   }
   ```

3. **接入支付**
   - 支付宝当面付
   - 微信支付
   - 或使用第三方支付平台

4. **Token 定价建议**
   ```
   免费版: 每天 5 次
   基础版: ¥9.9/100 次
   高级版: ¥29.9/500 次
   无限版: ¥99/月
   ```

## 📊 收入预估

| 用户数 | 日均使用 | 月收入 |
|--------|----------|--------|
| 100 | 10 次 | ¥3,000 |
| 500 | 10 次 | ¥15,000 |
| 1000 | 10 次 | ¥30,000 |

## 🔧 常见问题

### Q: 如何修改默认端口？
编辑 `vite.config.js` 中的 `server.port`

### Q: 如何配置 HTTPS？
使用 Let's Encrypt 或 Cloudflare

### Q: 如何接入自己的 API？
修改 `src/services/api.js` 中的 API 地址

---

**墨灵 - 让 AI 为你的创作赋能** 🖋️
