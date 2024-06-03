import { _decorator, Component, Node } from 'cc';
import {SceneManager} from "db://assets/Script/Scene/SceneManager";
import {SCENE_ENUM} from "db://assets/Script/Enum";
const { ccclass, property } = _decorator;

@ccclass('H2ASceneManager')
export class H2ASceneManager extends SceneManager {
    type: SCENE_ENUM = SCENE_ENUM.H2A

    start() {

    }

    update(deltaTime: number) {

    }
}


