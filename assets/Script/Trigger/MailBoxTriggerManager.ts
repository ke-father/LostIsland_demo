import {_decorator, Node} from 'cc';
import {ITEM_STATE_ENUM, ITEM_TYPE_ENUM, TRIGGER_STATE_ENUM, TRIGGER_TYPE_ENUM} from "db://assets/Script/Enum";
import DataManager from "db://assets/Script/Runtime/DataManager";
import {TriggerManager} from "db://assets/Script/Trigger/TriggerManager";

const { ccclass, property } = _decorator;

@ccclass('MailBoxTriggerManager')
export class MailBoxTriggerManager extends TriggerManager {
    type: TRIGGER_TYPE_ENUM = TRIGGER_TYPE_ENUM.MAILBOX

    // 未打开节点
    @property(Node) closeNode: Node = null!
    // 已打开节点
    @property(Node) openNode: Node = null!

    render() {
        super.render()
        // 判断状态是否为已打开
        const status = DataManager.Instance.MailBoxState === TRIGGER_STATE_ENUM.RESOLVED
        this.closeNode.active = !status
        this.openNode.active = status
    }

    handleTrigger () {
        if (DataManager.Instance.currentItemType !== ITEM_TYPE_ENUM.KEY || !DataManager.Instance.isSelect) return
        DataManager.Instance.currentItemType = null
        DataManager.Instance.isSelect = false
        DataManager.Instance.items.find(i => i.type === ITEM_TYPE_ENUM.KEY).state = ITEM_STATE_ENUM.DISABLE
        DataManager.Instance.items.find(i => i.type === ITEM_TYPE_ENUM.MAIL).state = ITEM_STATE_ENUM.SCENE
        DataManager.Instance.items = [...DataManager.Instance.items]
        DataManager.Instance.MailBoxState = TRIGGER_STATE_ENUM.RESOLVED
    }
}


