// page.tsx
'use client';

import {sendTemplateCards} from "@/libs/server-send-messages/send-template-cards";

export default function Home() {
  return (
    <div className="m-4">
      <p>Hello, lab-wecom-websocket-aibot!</p>
      <button className="p-2 border-2 border-gray-500 hover:bg-gray-200"
              onClick={sendTemplateCards}>
        点击来发送主动信息
      </button>
    </div>
  );
}
