"use server";

import {wsClientManager} from "@/libs/ws-client";

export async function sendTemplateCards() {
  const wsClient = wsClientManager.getClient();
  await wsClient.sendMessage(
    "WangZhiZhong",
    {
      msgtype: 'markdown',
      markdown: {
        content: "这是**粗体**，这是*斜体*，这是`代码块`。"
      }
    }
  )
}