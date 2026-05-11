#!/bin/bash
set -e

echo "=========================================="
echo "  墨灵 - AI 小说创作助手"
echo "  一键打包脚本"
echo "=========================================="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未检测到 Node.js，请先安装："
    echo "   https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js $(node --version)"

# 安装依赖
echo ""
echo "📦 安装依赖..."
if command -v pnpm &> /dev/null; then
    pnpm install
else
    npm install
fi

# 构建
echo ""
echo "🔨 构建生产版本..."
if command -v pnpm &> /dev/null; then
    pnpm build
else
    npm run build
fi

# 完成
echo ""
echo "=========================================="
echo "✅ 构建完成！"
echo ""
echo "📁 构建产物: ./dist/"
echo ""
echo "🚀 下一步："
echo "   1. 本地预览: npm run preview"
echo "   2. 部署服务器: 将 dist/ 上传到服务器"
echo "   3. 打包 APP: npx cap init 墨灵 com.yourname.mooling"
echo "=========================================="
