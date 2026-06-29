// instrumentation.ts

import AiBot from '@wecom/aibot-node-sdk';
import type { WsFrame } from '@wecom/aibot-node-sdk';
import { generateReqId } from '@wecom/aibot-node-sdk';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const botId = process.env.WECOM_BOT_ID;
    const secret = process.env.WECOM_BOT_SECRET;

    if (!botId || !secret) {
      console.error('❌ 未配置 WECOM_BOT_ID 或 WECOM_BOT_SECRET 环境变量');
      return;
    }

    console.log('🚀 正在连接企业微信机器人...');

    const wsClient = new AiBot.WSClient({
      botId,
      secret,
    });

    wsClient.connect();

    wsClient.on('connected', () => {
      console.log('🔗 WebSocket 连接已建立');
    });

    wsClient.on('authenticated', () => {
      console.log('🔐 机器人认证成功');
    });

    wsClient.on('disconnected', (reason: string) => {
      console.log('❌ 连接断开:', reason);
    });

    wsClient.on('reconnecting', (attempt: number) => {
      console.log(`🔄 正在重连... (第 ${attempt} 次)`);
    });

    wsClient.on('error', (error: Error) => {
      console.error('⚠️ 发生错误:', error);
    });

    wsClient.on('message.text', async (frame: WsFrame) => {
      const content = frame.body.text?.content;
      if (!content) {
        console.log('⚠️ 收到的消息没有内容');
        return;
      }

      console.log(`📨 收到文本消息: ${content}`);

      try {
        const streamId = generateReqId('stream');
        await wsClient.replyStream(frame, streamId, `你说了 ${content}`, true);
        console.log('✅ 回复成功');
      } catch (error) {
        console.error('❌ 回复失败:', error);
      }
    });

    wsClient.on('event.enter_chat', async (frame: WsFrame) => {
      console.log('👋 收到进入会话事件');
      try {
        await wsClient.replyWelcome(frame, {
          msgtype: 'text',
          text: { content: '您好！我是智能助手，有什么可以帮您的吗？' },
        });
        console.log('✅ 欢迎语发送成功');
      } catch (error) {
        console.error('❌ 欢迎语发送失败:', error);
      }
    });

    console.log('🤖 企业微信机器人已初始化');
  }
}
