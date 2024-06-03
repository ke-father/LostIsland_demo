import {_decorator, Button, instantiate, Label, Node, Prefab} from 'cc';
import {ITEM_STATE_ENUM, ITEM_TYPE_ENUM} from "db://assets/Script/Enum";
import {RenderManager} from "db://assets/Script/Base/RenderManager";
import DataManager from "db://assets/Script/Runtime/DataManager";
import {ItemManager} from "db://assets/Script/Item/ItemManager";

const { ccclass, property } = _decorator;

@ccclass('InventoryManager')
export default class InventoryManager extends RenderManager {
    // 钥匙预制体
    @property(Prefab) KeyPrefab: Prefab = null!
    // 船票预制体
    @property(Prefab) MailPrefab: Prefab = null!
    // 背包
    @property(Node) BagNode: Node = null!
    // 左侧button
    @property(Button) LeftButton: Button = null!
    // 右侧button
    @property(Button) RightButton: Button = null!
    // 手
    @property(Node) HandNode: Node = null!
    // label
    @property(Label) TipLabel: Label = null!

    render() {
        // 清空背包中内容
        this.BagNode.destroyAllChildren()
        // 获取状态为背包中的节点
        const inventoryItems = DataManager.Instance.items.filter(i => i.state === ITEM_STATE_ENUM.INVENTORY)
        // 激活当前项
        this.node.active = inventoryItems.length > 0
        // 当背包内无内容则不显示
        if (!inventoryItems.length) return

        // 设置当前选择类型
        const item = DataManager.Instance.items.find(i => i.type === DataManager.Instance.currentItemType && i.state === ITEM_STATE_ENUM.INVENTORY)
        if (!item) DataManager.Instance.currentItemType = inventoryItems[0].type
        // 渲染类型
        this.generateItem(DataManager.Instance.currentItemType)

        // 手节点
        this.HandNode.active = Boolean(DataManager.Instance.currentItemType) && DataManager.Instance.isSelect
        // 判断当前左右按钮状态
        this.onChangeButtonState()
    }

    generateItem (type: ITEM_TYPE_ENUM) {
        switch (type) {
            case ITEM_TYPE_ENUM.KEY:
                let keyPrefab = instantiate(this.KeyPrefab)
                this.BagNode.addChild(keyPrefab)
                this.TipLabel.string = keyPrefab.getComponent(ItemManager).label
                break
            case ITEM_TYPE_ENUM.MAIL:
                let mailPrefab = instantiate(this.MailPrefab)
                this.BagNode.addChild(mailPrefab)
                this.TipLabel.string = mailPrefab.getComponent(ItemManager).label
                break
            default:
                break
        }
    }

    // 关于背包点击显示手
    handleHandSelect  () {
        if (!DataManager.Instance.currentItemType) return
        DataManager.Instance.isSelect = !DataManager.Instance.isSelect
    }

    onRightButtonClick () {
        if (!DataManager.Instance.currentItemType) return
        // 将手的选择状态更改为false 数据中心选中状态为false
        DataManager.Instance.isSelect = false

        // 获取状态为背包中的所用物品
        const inventories = DataManager.Instance.items.filter(i => i.state === ITEM_STATE_ENUM.INVENTORY)
        // 获取当前选中物品索引
        const currentIndex = inventories.findIndex(i => i.type === DataManager.Instance.currentItemType)
        // 如果列表左边有内容
        inventories[currentIndex + 1] && (DataManager.Instance.currentItemType = inventories[currentIndex + 1].type)
    }

    onLeftButtonClick () {
        if (!DataManager.Instance.currentItemType) return
        // 将手的选择状态更改为false 数据中心选中状态为false
        DataManager.Instance.isSelect = false

        // 获取状态为背包中的所用物品
        const inventories = DataManager.Instance.items.filter(i => i.state === ITEM_STATE_ENUM.INVENTORY)
        // 获取当前选中物品索引
        const currentIndex = inventories.findIndex(i => i.type === DataManager.Instance.currentItemType)
        // 如果列表左边有内容
        inventories[currentIndex - 1] && (DataManager.Instance.currentItemType = inventories[currentIndex - 1].type)
    }

    onChangeButtonState () {
        if (!DataManager.Instance.currentItemType) {
            // 可点击状态 为false
            this.LeftButton.interactable = false
            this.RightButton.interactable = false
            return
        }

        // 获取状态为背包中的所用物品
        const inventories = DataManager.Instance.items.filter(i => i.state === ITEM_STATE_ENUM.INVENTORY)
        // 获取当前选中物品索引
        const currentIndex = inventories.findIndex(i => i.type === DataManager.Instance.currentItemType)

        this.LeftButton.interactable = Boolean(inventories[currentIndex - 1])
        this.RightButton.interactable = Boolean(inventories[currentIndex + 1])
    }
}


