// 场景类型
export enum SCENE_ENUM {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H2A = 'H2A'
}

// 物品状态
export enum ITEM_STATE_ENUM {
    // 在场景中
    SCENE = 'Scene',
    // 背包中
    INVENTORY = 'Inventory',
    // 消失
    DISABLE = 'Disable'
}

// 物品类型
export enum ITEM_TYPE_ENUM {
    // 钥匙
    KEY = 'Key',
    // 邮件
    MAIL = 'Mail'
}

// 事件枚举
export enum EVENT_ENUM {
    RENDER = 'Render'
}

export enum TRIGGER_TYPE_ENUM {
    MAILBOX = 'Mailbox',
    GRANDMO = 'GrandMo',
    MENU = 'Menu'
}

export enum TRIGGER_STATE_ENUM {
    // 未使用
    PENDING = 'Pending',
    // 已使用
    RESOLVED = 'Resolved'
}
