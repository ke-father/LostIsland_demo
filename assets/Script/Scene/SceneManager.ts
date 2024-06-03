import { _decorator, Component, Node, Event, director, instantiate, Prefab } from 'cc';
import {SCENE_ENUM} from "db://assets/Script/Enum";
import {RenderManager} from "db://assets/Script/Base/RenderManager";
import DataManager from "db://assets/Script/Runtime/DataManager";
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends RenderManager {
    // 场景中物体节点
    @property(Node) ItemNode: Node = null!
    // 背包节点
    @property(Prefab) InventoryNode: Prefab = null!
    // 菜单按钮
    @property(Prefab) MenuIcon: Prefab = null!

    readonly type: SCENE_ENUM

    start () {
        super.start()
        DataManager.Instance.reLoadLocalData()
        // 预加载所有场景内容
        // director.preloadScene(SCENE_ENUM.H1)
        // director.preloadScene(SCENE_ENUM.H2)
        // director.preloadScene(SCENE_ENUM.H3)
        // director.preloadScene(SCENE_ENUM.H4)

        // 判断有没有绑定这个内容
        if (this.InventoryNode) {
            // 实例化预制体
            const inventory = instantiate(this.InventoryNode)
            // 挂载
            this.node.addChild(inventory)
        }

        // 判断有没有绑定这个内容
        if (this.MenuIcon) {
            // 实例化预制体
            const MenuIcon = instantiate(this.MenuIcon)
            // 挂载
            this.node.addChild(MenuIcon)
        }
    }


    // 切换场景
    changeScene (e: Event, scene: SCENE_ENUM) {
        DataManager.Instance.CurrentScene = scene
    }

    render() {
        if (DataManager.Instance.CurrentScene === this.type) return

        // 切换场景
        director.loadScene(DataManager.Instance.CurrentScene)
    }
}


