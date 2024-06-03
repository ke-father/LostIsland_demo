import { _decorator, Component, Node } from 'cc';
import {ItemManager} from "db://assets/Script/Item/ItemManager";
import {ITEM_TYPE_ENUM} from "db://assets/Script/Enum";
const { ccclass, property } = _decorator;

@ccclass('MailItemManager')
export class MailItemManager extends ItemManager {
    // 名称
    label = '船票'
    // 类型
    type = ITEM_TYPE_ENUM.MAIL
}


