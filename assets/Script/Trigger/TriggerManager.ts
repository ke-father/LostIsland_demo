import {_decorator, Component, Event, Node, Sprite, SpriteFrame} from 'cc';
import {RenderManager} from "db://assets/Script/Base/RenderManager";
import {TRIGGER_TYPE_ENUM} from "db://assets/Script/Enum";

const { ccclass, property } = _decorator;

@ccclass('TriggerManager')
export class TriggerManager extends RenderManager {
    type: TRIGGER_TYPE_ENUM

    render() {
    }

    start() {
        super.start();
    }
}


