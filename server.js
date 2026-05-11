/**
 * 墨灵 API 代理服务
 * 用户调用你的接口，你转发到 OpenAI，按次计费
 */

import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// 配置
const CONFIG = {
  port: 3000,
  openaiKey: process.env.OPENAI_KEY || 'sk-your-openai-key',
  // Token 定价（单位：分）
  pricePerCall: 10,  // 每次调用 0.1 元
  freeCallsPerDay: 5, // 每天免费 5 次
};

// 用户数据存储（简单版，生产环境用数据库）
const users = new Map();

// 获取用户信息
function getUser(userId) {
  if (!users.has(userId)) {
    users.set(userId, {
      id: userId,
      freeCallsToday: CONFIG.freeCallsPerDay,
      totalCalls: 0,
      balance: 0, // 余额（分）
      lastReset: new Date().toDateString(),
    });
  }
  
  const user = users.get(userId);
  
  // 每天重置免费次数
  const today = new Date().toDateString();
  if (user.lastReset !== today) {
    user.freeCallsToday = CONFIG.freeCallsPerDay;
    user.lastReset = today;
  }
  
  return user;
}

// 检查用户是否有额度
function checkQuota(userId) {
  const user = getUser(userId);
  
  // 有免费次数
  if (user.freeCallsToday > 0) {
    return { allowed: true, type: 'free', remaining: user.freeCallsToday };
  }
  
  // 有余额
  if (user.balance >= CONFIG.pricePerCall) {
    return { allowed: true, type: 'paid', balance: user.balance };
  }
  
  // 没有额度
  return { 
    allowed: false, 
    message: '额度用完了，请充值或等待明天的免费次数',
    balance: user.balance,
    freeCalls: user.freeCallsToday,
  };
}

// 扣除额度
function deductQuota(userId) {
  const user = getUser(userId);
  
  if (user.freeCallsToday > 0) {
    user.freeCallsToday--;
  } else {
    user.balance -= CONFIG.pricePerCall;
  }
  
  user.totalCalls++;
}

// API 代理接口
app.post('/api/chat', async (req, res) => {
  try {
    const userId = req.body.userId || 'anonymous';
    const messages = req.body.messages;
    
    // 检查额度
    const quota = checkQuota(userId);
    if (!quota.allowed) {
      return res.status(402).json({ 
        error: 'INSUFFICIENT_QUOTA',
        message: quota.message,
        balance: quota.balance,
      });
    }
    
    // 调用 OpenAI API（这里用模拟响应，测试用）
    // 实际使用时取消注释下面的代码
    /*
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: req.body.model || 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: req.body.max_tokens || 2000,
      temperature: req.body.temperature || 0.7,
      stream: false,
    }, {
      headers: {
        'Authorization': `Bearer ${CONFIG.openaiKey}`,
        'Content-Type': 'application/json',
      },
    });
    */
    
    // 模拟响应（测试用）
    const mockResponse = {
      id: 'chatcmpl-mock',
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: req.body.model || 'gpt-3.5-turbo',
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: `【墨灵 AI 测试响应】\n\n收到你的消息：${messages[messages.length - 1]?.content || '无内容'}\n\n这是模拟响应，实际使用时会调用真实的 AI 模型。`,
        },
        finish_reason: 'stop',
      }],
      usage: {
        prompt_tokens: 50,
        completion_tokens: 100,
        total_tokens: 150,
      },
    };
    
    // 扣除额度
    deductQuota(userId);
    
    // 返回结果
    const user = getUser(userId);
    res.json({
      success: true,
      data: mockResponse,
      quota: {
        freeCallsToday: user.freeCallsToday,
        balance: user.balance,
        totalCalls: user.totalCalls,
      },
    });
    
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'API_ERROR',
      message: error.response?.data?.error?.message || '调用失败',
    });
  }
});

// 查询用户信息
app.get('/api/user/:userId', (req, res) => {
  const user = getUser(req.params.userId);
  res.json({
    id: user.id,
    freeCallsToday: user.freeCallsToday,
    balance: user.balance,
    totalCalls: user.totalCalls,
    pricePerCall: CONFIG.pricePerCall,
  });
});

// 充值接口（示例）
app.post('/api/recharge', (req, res) => {
  const { userId, amount } = req.body;
  const user = getUser(userId);
  
  // 这里应该接入真实支付
  // 简单示例：直接加余额
  user.balance += amount;
  
  res.json({
    success: true,
    balance: user.balance,
    message: `充值成功，获得 ${amount} 次调用`,
  });
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 启动服务
app.listen(CONFIG.port, () => {
  console.log(`🖋️ 墨灵 API 服务已启动: http://localhost:${CONFIG.port}`);
  console.log(`📊 定价: ${CONFIG.pricePerCall/100} 元/次`);
  console.log(`🎁 免费: ${CONFIG.freeCallsPerDay} 次/天`);
});
