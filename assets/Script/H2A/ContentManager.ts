import { _decorator, Component, Node, SpriteFrame, CCInteger, Sprite } from 'cc';
import {RenderManager} from "db://assets/Script/Base/RenderManager";
import DataManager from "db://assets/Script/Runtime/DataManager";
const { ccclass, property } = _decorator;

@ccclass('ContentManager')
export class ContentManager extends RenderManager {
    // 常规图片
    @property(SpriteFrame) NormalSF: SpriteFrame = null!
    // 成功图片
    @property(SpriteFrame) SuccessSF: SpriteFrame = null!
    // 索引
    @property(CCInteger) index: number

    render () {
        const currentIndex = DataManager.Instance.H2AData.findIndex(i => i === this.index)
        const answerIndex = DataManager.Instance.H2AAnswer.findIndex(i => i === this.index)
        this.getComponent(Sprite).spriteFrame = currentIndex === answerIndex ? this.SuccessSF : this.NormalSF
    }
}


