import {_decorator, Node, Prefab, instantiate} from 'cc';
import {ITEM_STATE_ENUM, ITEM_TYPE_ENUM, TRIGGER_STATE_ENUM, TRIGGER_TYPE_ENUM} from "db://assets/Script/Enum";
import DataManager from "db://assets/Script/Runtime/DataManager";
import {TriggerManager} from "db://assets/Script/Trigger/TriggerManager";

const { ccclass, property } = _decorator;

@ccclass('MenuTriggerManager')
export class MenuTriggerManager extends TriggerManager {
    type: TRIGGER_TYPE_ENUM = TRIGGER_TYPE_ENUM.MENU

    @property(Prefab) MenuBlock: Prefab = null!

    start() {
        super.start();

        this.node.on(Node.EventType.TOUCH_END, this.handleTrigger, this)
    }

    onDestroy() {
        super.onDestroy();

        this.node.off(Node.EventType.TOUCH_END, this.handleTrigger, this)
    }

    render() {
        super.render()

        this.node.active = DataManager.Instance.MenuIconState === TRIGGER_STATE_ENUM.PENDING
    }

    handleTrigger () {
        let menuBlock = instantiate(this.MenuBlock)
        this.node.parent.addChild(menuBlock)
        DataManager.Instance.MenuIconState = TRIGGER_STATE_ENUM.RESOLVED
        DataManager.Instance.MenuOptionState = TRIGGER_STATE_ENUM.PENDING
    }
}


