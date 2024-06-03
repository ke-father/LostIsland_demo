import { _decorator, Component, Node } from 'cc';
import {SceneManager} from "db://assets/Script/Scene/SceneManager";
import {SCENE_ENUM} from "db://assets/Script/Enum";
const { ccclass, property } = _decorator;

@ccclass('H3SceneManager')
export class H3SceneManager extends SceneManager {
    type: SCENE_ENUM = SCENE_ENUM.H3

    start() {

    }

    update(deltaTime: number) {

    }
}


