#!/bin/bash
set -e

echo "=========================================="
echo "  🖋️ 墨灵 - AI 小说创作助手"
echo "=========================================="
echo ""

# 检查是否已构建
if [ ! -d "dist" ]; then
    echo "⚠️  未检测到构建产物，正在构建..."
    ./build.sh
fi

# 启动预览服务器
echo "🚀 启动预览服务器..."
echo ""
echo "📍 访问地址: http://localhost:4173"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

if command -v pnpm &> /dev/null; then
    pnpm preview
else
    npm run preview
fi
