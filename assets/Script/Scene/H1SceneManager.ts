import {_decorator} from 'cc';
import {SceneManager} from "db://assets/Script/Scene/SceneManager";
import {SCENE_ENUM} from "db://assets/Script/Enum";

const { ccclass, property } = _decorator;

@ccclass('H1SceneManager')
export class H1SceneManager extends SceneManager {
    type: SCENE_ENUM = SCENE_ENUM.H1

    start() {
        super.start()
    }

    update(deltaTime: number) {

    }
}


