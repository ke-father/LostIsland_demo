// 数据中心
import { sys } from "cc";
import Singleton from "db://assets/Script/Base/Singleton";
import {EVENT_ENUM, ITEM_STATE_ENUM, ITEM_TYPE_ENUM, SCENE_ENUM, TRIGGER_STATE_ENUM} from "db://assets/Script/Enum";
import EventManager from "db://assets/Script/Runtime/EventManager";

interface IItems {
    // 物品状态
    state: ITEM_STATE_ENUM
    // 物品类型
    type: ITEM_TYPE_ENUM
}

const LOCAL_DATA_KEY = 'LostIslandData'

export default class DataManager extends Singleton {
    static get Instance () {
        return super.getInstance<DataManager>()
    }

    // H2A场景小游戏答案
    readonly H2AAnswer = [0, 1, 2, 3, 4, 5, null]
    // H2A场景小游戏初始化数据
    readonly H2AInit= [1, 0, 3, 2, 5, 4, null]
    // 记录数据
    private _H2AData = this.H2AInit
    // 物品内容
    private _items: IItems[] = [
        // 物品所在与物品类型
        { state: ITEM_STATE_ENUM.SCENE, type: ITEM_TYPE_ENUM.KEY },
        { state: ITEM_STATE_ENUM.DISABLE, type: ITEM_TYPE_ENUM.MAIL },
    ]
    // 当前选中物品类型
    private _currentItemType: ITEM_TYPE_ENUM | null = null
    // 是否选中
    private _isSelect: boolean = false
    // 邮箱状态字段
    private _MailBoxState: TRIGGER_STATE_ENUM = TRIGGER_STATE_ENUM.PENDING
    // 老太太状态
    private _GrandMoState: TRIGGER_STATE_ENUM = TRIGGER_STATE_ENUM.PENDING
    // 对话索引
    private _GrandMoDialogIndex: number = -1
    // 门的状态
    private _DoorState: TRIGGER_STATE_ENUM = TRIGGER_STATE_ENUM.PENDING
    // 场景
    private _CurrentScene: SCENE_ENUM = SCENE_ENUM.H1
    // 菜单状态
    private _MenuIconState: TRIGGER_STATE_ENUM = TRIGGER_STATE_ENUM.PENDING
    // 菜单选项背景状态
    private _MenuOptionState: TRIGGER_STATE_ENUM = TRIGGER_STATE_ENUM.RESOLVED

    get MenuIconState () {
        return this._MenuIconState
    }

    set MenuIconState (newState) {
        this._MenuIconState = newState
        this.render()
    }

    get MenuOptionState () {
        return this._MenuOptionState
    }

    set MenuOptionState (newState) {
        this._MenuOptionState = newState
        this.render()
    }

    get CurrentScene () {
        return this._CurrentScene
    }

    set CurrentScene (newScene) {
        this._CurrentScene = newScene
        this.render()
    }

    get DoorState () {
        return this._DoorState
    }

    set DoorState (newState) {
        this._DoorState = newState
        this.render()
    }

    get H2AData () {
        return this._H2AData
    }

    set H2AData (newData) {
        this._H2AData = newData
        this.render()
    }

    get GrandMoDialogIndex () {
        return this._GrandMoDialogIndex
    }

    set GrandMoDialogIndex (newIndex) {
        this._GrandMoDialogIndex = newIndex

        this.render()
    }


    get GrandMoState () {
        return this._GrandMoState
    }

    set GrandMoState (newState) {
        this._GrandMoState = newState

        this.render()
    }

    get MailBoxState () {
        return this._MailBoxState
    }

    set MailBoxState (newState) {
        this._MailBoxState = newState
        this.render()
    }

    get isSelect () {
        return this._isSelect
    }

    set isSelect (newIsSelect) {
        this._isSelect = newIsSelect

        this.render()
    }

    get currentItemType () {
        return this._currentItemType
    }

    set currentItemType (newType) {
        this._currentItemType = newType

        this.render()
    }


    get items () {
        return this._items
    }

    set items (newItem) {
        this._items = newItem

        this.render()
    }

    render () {
        EventManager.Instance.emit(EVENT_ENUM.RENDER)

        // 数据存储
        this.saveLocalData()
    }

    saveLocalData () {
        sys.localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify({
            items: this._items,
            currentItemType: this._currentItemType,
            isSelect: this._isSelect,
            H2AData: this._H2AData,
            MailBoxState: this._MailBoxState,
            GrandMoState: this._GrandMoState,
            GrandMoDialogIndex: this._GrandMoDialogIndex,
            DoorState: this._DoorState,
            CurrentScene: this._CurrentScene,
            MenuIconState: this._MenuIconState,
            MenuOptionState: this._MenuOptionState
        }))
    }

    reLoadLocalData () {
        try {
            const data = JSON.parse(sys.localStorage.getItem(LOCAL_DATA_KEY))
            this._items = data.items
            this._currentItemType = data.currentItemType
            this._isSelect = data.isSelect
            this._H2AData = data.H2AData
            this._MailBoxState = data.MailBoxState
            this._GrandMoState = data.GrandMoState
            this._GrandMoDialogIndex = data.GrandMoDialogIndex
            this._DoorState = data.DoorState
            this._CurrentScene = data.CurrentScene
            this._MenuIconState = data.MenuIconState
            this._MenuOptionState = data.MenuOptionState
        } catch (e) {
            this.resetData()
        }
    }

    resetData () {
        sys.localStorage.clear()
        this._items = [
            // 物品所在与物品类型
            { state: ITEM_STATE_ENUM.SCENE, type: ITEM_TYPE_ENUM.KEY },
            { state: ITEM_STATE_ENUM.DISABLE, type: ITEM_TYPE_ENUM.MAIL },
        ]
        this._currentItemType = null
        this._isSelect = false
        this._H2AData = this.H2AInit
        this._MailBoxState = TRIGGER_STATE_ENUM.PENDING
        this._GrandMoState = TRIGGER_STATE_ENUM.PENDING
        this._GrandMoDialogIndex = -1
        this._DoorState = TRIGGER_STATE_ENUM.PENDING
        this._CurrentScene = SCENE_ENUM.H1
        this._MenuIconState = TRIGGER_STATE_ENUM.PENDING
        this._MenuOptionState = TRIGGER_STATE_ENUM.RESOLVED
        this.render()
    }
}
