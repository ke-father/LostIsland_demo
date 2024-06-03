import {_decorator, Component, Event, Node} from 'cc';
import EventManager from "db://assets/Script/Runtime/EventManager";
import {EVENT_ENUM} from "db://assets/Script/Enum";
const { ccclass, property } = _decorator;

@ccclass('RenderManager')
export abstract class RenderManager extends Component {
    onLoad () {
        EventManager.Instance.on(EVENT_ENUM.RENDER, this.render, this)
    }

    onDestroy () {
        EventManager.Instance.off(EVENT_ENUM.RENDER, this.render, this)
    }

    start () {
        this.render()
    }

    abstract render (): void
}


