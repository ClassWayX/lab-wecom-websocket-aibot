import {generateReqId, TemplateCard, TemplateCardType} from "@wecom/aibot-node-sdk";

export default function generateFullStructureCard(): TemplateCard {
    return {
        card_type: TemplateCardType.TextNotice,
        card_action: {
            type: 1,
            url: "https://www.example.com/",
            appid: "APPID",
            pagepath: "PAGEPATH"
        },
        source: {
            icon_url: "https://avatars.githubusercontent.com/u/297540307",
            desc: "2026/6/22–2026/6/28 修为汇总",
            desc_color: 0
        },
        // action_menu: {
        //     desc: 'action_menu.desc',
        //     action_list: [
        //         {
        //             text: 'action_menu.action_list.text@1',
        //             key: 'action_menu.action_list.key@1',
        //         },
        //         {
        //             text: 'action_menu.action_list.text@2',
        //             key: 'action_menu.action_list.key@2',
        //         }
        //     ]
        // },
        main_title: {
            title: '获得第一名的小组是……',
            // desc: '主标题描述',
        },
        sub_title_text: '名列前茅的小组得分一览',
        emphasis_content: {
            title: '猪妞嘉豪',
            desc: '总计 100 分',
        },
        quote_area: {
            type: 0,
            title: '班级总积分已达到……',
            quote_text: '1666 分',
        },
        horizontal_content_list: [
            {
                type: 0,
                keyname: '猪妞嘉豪',
                value: '100 修为',
            },
            {
                type: 0,
                keyname: '被做局组',
                value: '90 修为',
            },
            {
                type: 0,
                keyname: 'హ小馋猫హ',
                value: '90 修为',
            },
            {
                type: 0,
                keyname: '贝利亚',
                value: '90 修为',
            },
        ],
        jump_list: [
            {
                type: 1,
                title: '跳转至修为网站',
                url: 'https://www.example.com/',
            }
        ],

        task_id: generateReqId('card')
    }
}