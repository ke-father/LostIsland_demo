import { _decorator, Component, Node, instantiate, Prefab } from 'cc';
import {SceneManager} from "db://assets/Script/Scene/SceneManager";
import DataManager from "db://assets/Script/Runtime/DataManager";
import {ITEM_STATE_ENUM, ITEM_TYPE_ENUM, SCENE_ENUM} from "db://assets/Script/Enum";
const { ccclass, property } = _decorator;

@ccclass('H4SceneManager')
export class H4SceneManager extends SceneManager {
    type: SCENE_ENUM = SCENE_ENUM.H4

    @property(Prefab) MailPrefab: Prefab = null!

    render() {
        super.render()
        // 首先清除ItemNode下所有内容
        this.ItemNode.destroyAllChildren()

        // 获取场景物体 并判断物体是否在场景中
        const item = DataManager.Instance.items.find(i => i.type === ITEM_TYPE_ENUM.MAIL && i.state === ITEM_STATE_ENUM.SCENE)
        if (!item) return
        // 实例化预制体
        let MailPrefab = instantiate(this.MailPrefab)
        // 将预制体放入指定位置
        this.ItemNode.addChild(MailPrefab)
    }
}


