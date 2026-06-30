// instrumentation.ts

import type { WsFrame } from '@wecom/aibot-node-sdk';
import { generateReqId } from '@wecom/aibot-node-sdk';
import generateButtonInteraction from "@/libs/template-cards-gen/button-interaction-gen";
import generateFullStructureCard from "@/libs/template-cards-gen/full-structure-gen";
import {wsClientManager} from "@/libs/ws-client";

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log("code v1")
    console.log('🚀 正在连接企业微信机器人...');

    const wsClient = wsClientManager.getClient();

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

        console.log('📨 收到完整消息帧:', JSON.stringify(frame, null, 2));
        console.log(`📨 收到文本消息: ${content}`);

        try {
            // 如果用户发送 '卡片' 或 '操作'，则回复可操作卡片
            if (content.includes('卡片') || content.includes('操作')) {
                const taskId = `task_${Date.now()}`;
                console.log(`🆔 使用 task_id: ${taskId}`);
                const replyResult = await wsClient.replyTemplateCard(frame, generateButtonInteraction())
                console.log('✅ 卡片回复成功，响应:', JSON.stringify(replyResult, null, 2));
            } else if (content.includes("全部")) {
                const replyResult = await wsClient.replyTemplateCard(frame, generateFullStructureCard())
                console.log('✅ 卡片回复成功，:', JSON.stringify(replyResult, null, 2));
            } else {
                // 否则正常回复
                const streamId = generateReqId('stream');
                await wsClient.replyStream(frame, streamId, `你说了 ${content}`, true);
                console.log('✅ 回复成功');
            }
        } catch (error) {
            console.error('❌ 回复失败:', error);
        }
    });

    // 监听所有事件，方便调试
    wsClient.on('event', (frame: WsFrame) => {
        console.log('🔔 收到事件:', JSON.stringify(frame, null, 2));
    });

    // 监听模板卡片按钮点击事件
    wsClient.on('event.template_card_event', async (frame: WsFrame) => {
        console.log('🎯 收到 template_card_event，完整帧:', JSON.stringify(frame, null, 2));
        
        // 注意：事件数据结构在 frame.body.event.template_card_event 中
        const templateCardEvent = frame.body.event?.template_card_event;
        const eventKey = templateCardEvent?.event_key;
        const taskId = templateCardEvent?.task_id;
        const userid = frame.body.from?.userid;

        console.log(`🔘 用户 ${userid} 点击了按钮: ${eventKey}, task_id: ${taskId}`);

        // 如果没有 task_id，无法更新卡片
        if (!taskId) {
            console.error('❌ 没有收到 task_id，无法更新卡片');
            return;
        }

        try {
            // 根据点击的按钮更新卡片
            let newTitle = '';
            let newDesc = '';

            switch (eventKey) {
                case 'btn_confirm':
                    newTitle = '✅ 已确认';
                    newDesc = '您已确认操作，感谢您的使用！';
                    break;
                case 'btn_cancel':
                    newTitle = '❌ 已取消';
                    newDesc = '您已取消操作，欢迎下次使用！';
                    break;
                case 'btn_detail':
                    newTitle = '📋 详情';
                    newDesc = '这是详细信息页面，您可以在这里查看更多内容。';
                    break;
                default:
                    newTitle = '未知操作';
                    newDesc = `您点击了按钮: ${eventKey}`;
            }

            console.log(`📝 准备更新卡片，task_id: ${taskId}`);
            
            // 更新卡片 - 保持按钮交互类型，但只保留一个提示按钮
            const updateResult = await wsClient.updateTemplateCard(frame, {
                card_type: "button_interaction",
                main_title: {
                    title: newTitle,
                    desc: newDesc,
                },
                button_list: [
                    { text: '已完成', key: 'btn_done', style: 1 }
                ],
                card_action: {
                    type: 0
                },
                task_id: taskId,
            });
            
            console.log('✅ 卡片更新成功，响应:', JSON.stringify(updateResult, null, 2));
        } catch (error) {
            console.error('❌ 卡片更新失败:', error);
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
