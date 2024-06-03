import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import {SceneManager} from "db://assets/Script/Scene/SceneManager";
import {ITEM_STATE_ENUM, ITEM_TYPE_ENUM, SCENE_ENUM} from "db://assets/Script/Enum";
import DataManager from "db://assets/Script/Runtime/DataManager";
const { ccclass, property } = _decorator;

@ccclass('H2SceneManager')
export class H2SceneManager extends SceneManager {
    type: SCENE_ENUM = SCENE_ENUM.H2

    @property(Prefab) KeyPrefab: Prefab = null!

    render() {
        super.render()
        // 首先清除ItemNode下所有内容
        this.ItemNode.destroyAllChildren()

        // 获取场景物体 并判断物体是否在场景中
        const item = DataManager.Instance.items.find(i => i.type === ITEM_TYPE_ENUM.KEY && i.state === ITEM_STATE_ENUM.SCENE)
        if (!item) return
        // 实例化预制体
        let keyPrefab = instantiate(this.KeyPrefab)
        // 将预制体放入指定位置
        this.ItemNode.addChild(keyPrefab)
    }
}


