import {generateReqId, TemplateCard, TemplateCardType} from "@wecom/aibot-node-sdk";

export default function generateButtonInteraction(): TemplateCard {
    return {
        card_type: TemplateCardType.ButtonInteraction,
        main_title: {
            title: "欢迎使用企业微信！",
            // desc: "您的好友正在邀请您加入企业微信"
        },
        button_list: [
            {
                text: "按钮1",
                style: 4,
                key: "BUTTONKEYONE"
            },
            {
                text: "按钮2",
                style: 1,
                key: "BUTTONKEYTWO"
            }
        ],
        card_action: {
            type: 0,
        },

        task_id: generateReqId('card')
    }
}