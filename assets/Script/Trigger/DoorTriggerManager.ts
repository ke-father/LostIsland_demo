import {_decorator, Node, director, Sprite} from 'cc';
import DataManager from "db://assets/Script/Runtime/DataManager";
import {TriggerManager} from "db://assets/Script/Trigger/TriggerManager";
import {SCENE_ENUM, TRIGGER_STATE_ENUM} from "db://assets/Script/Enum";

const { ccclass, property } = _decorator;

@ccclass('DoorTriggerManager')
export class DoorTriggerManager extends TriggerManager {
    render() {
        super.render()

        const sprite = this.getComponent(Sprite)
        sprite.enabled = DataManager.Instance.DoorState === TRIGGER_STATE_ENUM.PENDING
    }

    handleTrigger () {
        switch (DataManager.Instance.DoorState) {
            case TRIGGER_STATE_ENUM.PENDING:
                DataManager.Instance.CurrentScene = SCENE_ENUM.H2A
                break
            case TRIGGER_STATE_ENUM.RESOLVED:
                DataManager.Instance.CurrentScene = SCENE_ENUM.H3
                break
        }
    }
}


