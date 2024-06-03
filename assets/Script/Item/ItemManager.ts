import {_decorator, Component, Event, Node, Sprite, SpriteFrame} from 'cc';
import {ITEM_STATE_ENUM, ITEM_TYPE_ENUM} from "db://assets/Script/Enum";
import DataManager from "db://assets/Script/Runtime/DataManager";
import {RenderManager} from "db://assets/Script/Base/RenderManager";

const { ccclass, property } = _decorator;

@ccclass('ItemManager')
export class ItemManager extends RenderManager {
    // 名称
    label = '物品'
    // 物品类型
    type: ITEM_TYPE_ENUM

    // 在场景中的图片
    @property(SpriteFrame) sceneSf: SpriteFrame
    // 在背包中的图片
    @property(SpriteFrame) inventorySf: SpriteFrame

    start() {
        super.start()
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this)
    }

    onDestroy () {
        super.onDestroy()
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd)
    }

    // 触碰结束事件
    onTouchEnd (event: Event) {
        // 获取数据中心当前物品状态
        const item = DataManager.Instance.items.find(i => i.type === this.type)

        if (!item) return

        switch (item.state) {
            case ITEM_STATE_ENUM.SCENE:
                item.state = ITEM_STATE_ENUM.INVENTORY
        }

        DataManager.Instance.items = [...DataManager.Instance.items]
    }

    render() {
        // 获取数据中心当前物品状态
        const state = DataManager.Instance.items.find(i => i.type === this.type)?.state
        // 获取当前节点Sprite组件
        const spriteComponent = this.getComponent(Sprite)

        switch (state) {
            case ITEM_STATE_ENUM.SCENE:
                this.node.active = true
                spriteComponent.spriteFrame = this.sceneSf
                break
            case ITEM_STATE_ENUM.INVENTORY:
                this.node.active = true
                spriteComponent.spriteFrame = this.inventorySf
                break
            case ITEM_STATE_ENUM.DISABLE:
                this.node.active = false
                break
            default:
                break
        }
    }
}


