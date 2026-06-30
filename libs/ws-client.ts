import AiBot, {WSClient} from "@wecom/aibot-node-sdk";

class WsClientManager {
  private wsClient: WSClient;

  constructor() {
    const botId = process.env.WECOM_BOT_ID || '';
    const secret = process.env.WECOM_BOT_SECRET || '';
    this.wsClient = new AiBot.WSClient({
      botId,
      secret,
    });
  }

  getClient() {
    return this.wsClient
  }
}

const globalWithClient = globalThis as unknown as {
  globalWsClient: WsClientManager | undefined;
};

export const wsClientManager = globalWithClient.globalWsClient ?? new WsClientManager();

globalWithClient.globalWsClient = wsClientManager;