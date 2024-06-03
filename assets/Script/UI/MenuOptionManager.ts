import {_decorator, Component} from 'cc';
import DataManager from "db://assets/Script/Runtime/DataManager";
import {SCENE_ENUM, TRIGGER_STATE_ENUM} from "db://assets/Script/Enum";
import {RenderManager} from "db://assets/Script/Base/RenderManager";

const { ccclass, property } = _decorator;

@ccclass('MenuTriggerManager')
export class MenuTriggerManager extends Component {
    handleNewGame () {
        DataManager.Instance.MenuOptionState = TRIGGER_STATE_ENUM.RESOLVED
        DataManager.Instance.MenuIconState = TRIGGER_STATE_ENUM.PENDING
        DataManager.Instance.CurrentScene = SCENE_ENUM.H1
        DataManager.Instance.resetData()
        this.node.parent.removeChild(this.node)
    }

    handleLoadGame () {
        DataManager.Instance.MenuOptionState = TRIGGER_STATE_ENUM.RESOLVED
        DataManager.Instance.MenuIconState = TRIGGER_STATE_ENUM.PENDING
        DataManager.Instance.reLoadLocalData()
        this.node.parent.removeChild(this.node)
    }
}


