import {_decorator, Label, Node} from 'cc';
import {ITEM_STATE_ENUM, ITEM_TYPE_ENUM, TRIGGER_STATE_ENUM, TRIGGER_TYPE_ENUM} from "db://assets/Script/Enum";
import DataManager from "db://assets/Script/Runtime/DataManager";
import {TriggerManager} from "db://assets/Script/Trigger/TriggerManager";

const {ccclass, property} = _decorator;

@ccclass('GrandMoTriggerManager')
export class GrandMoTriggerManager extends TriggerManager {
    type: TRIGGER_TYPE_ENUM = TRIGGER_TYPE_ENUM.GRANDMO

    // 对话框节点
    @property(Node) DialogNode: Node = null!
    // 对话内容
    @property(Label) DialogLabel: Label = null!

    // 老太太pending状态对话框
    private readonly pendingDialogList = [
        '我年纪大了，很多事情想不起来了',
        '你是谁？算了，我也不在乎你是谁。你能帮我找到信箱的钥匙吗？',
        '老头子说最近会给我寄船票过来，叫我和他一起出去看看。虽然我没有什么兴趣...',
        '他折腾了一辈子，不是躲在楼上捣鼓什么时间机器，就是出海找点什么东西。',
        '这些古怪的电视节目真没有什么意思。',
        '老头子说这个岛上有很多秘密，其实我知道，不过是岛上的日子太孤独，他找点事情做罢了。',
        '人嘛，谁没有年轻过。年轻的时候...算了，不说这些往事了。',
        '老了才明白，万物静默如迷。',
    ]
    // 老太太resolved状态对话框
    private readonly resolvedDialogList = [
        '没想到老头子的船票寄过来了，谢谢你。'
    ]

    render() {
        super.render()

        let index = DataManager.Instance.GrandMoDialogIndex
        console.log(index)

        if (index === -1) {
            // 对话框为隐藏
            this.DialogNode.active = false
            return
        }

        this.DialogNode.active = true
        // dialog对话框中的内容由老太太的状态动态选择
        this.DialogLabel.string = DataManager.Instance.GrandMoState === TRIGGER_STATE_ENUM.PENDING
            ? this.pendingDialogList[index]
            : this.resolvedDialogList[index]
    }

    handleTrigger() {
        console.log(111)
        // 如果当前背包item为船票并且选中 老太太为pending状态
        if (DataManager.Instance.currentItemType === ITEM_TYPE_ENUM.MAIL && DataManager.Instance.isSelect && DataManager.Instance.GrandMoState === TRIGGER_STATE_ENUM.PENDING) {
            DataManager.Instance.currentItemType = null
            DataManager.Instance.isSelect = false
            DataManager.Instance.items.find(i => i.type === ITEM_TYPE_ENUM.MAIL).state = ITEM_STATE_ENUM.DISABLE
            DataManager.Instance.items = [...DataManager.Instance.items]
            DataManager.Instance.GrandMoState = TRIGGER_STATE_ENUM.RESOLVED
            DataManager.Instance.GrandMoDialogIndex = 0
            return
        }

        DataManager.Instance.GrandMoDialogIndex >= this[DataManager.Instance.GrandMoState === TRIGGER_STATE_ENUM.PENDING ? 'pendingDialogList' : 'resolvedDialogList'].length - 1
            ? DataManager.Instance.GrandMoDialogIndex = -1
            : DataManager.Instance.GrandMoDialogIndex++
    }
}


