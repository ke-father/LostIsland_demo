import {_decorator, director, instantiate, Node, Prefab, UITransform} from 'cc';
import {CircleManager} from "db://assets/Script/H2A/CircleManager";
import {RenderManager} from "db://assets/Script/Base/RenderManager";
import DataManager from "db://assets/Script/Runtime/DataManager";
import {ContentManager} from "db://assets/Script/H2A/ContentManager";
import {SCENE_ENUM, TRIGGER_STATE_ENUM} from "db://assets/Script/Enum";

const {ccclass, property} = _decorator;

// 圆的半径
const CIRCLE_RADIUS = 80;

@ccclass('H2AGameManager')
export class H2AGameManager extends RenderManager {
    // circle数组
    @property([CircleManager]) Circles: CircleManager[] = [];
    // 关系线管理节点
    @property(Node) Lines: Node = null!
    // 关系线预制体
    @property(Prefab) LinePrefab: Prefab = null!
    // 控制节点预制体
    @property([Prefab]) ContentPrefab: Prefab[] = []

    // circle关系图
    private circleMap: Array<Array<number>> = [
        [1, 4, 6],
        [0, 5, 6],
        [4, 6],
        [5, 6],
        [0, 2, 5, 6],
        [1, 3, 4, 6],
        [0, 1, 2, 3, 4, 5]
    ]

    start() {
        // 关联关系图
        this.generateCircleMap();
        super.start()
        // 渲染关系线
        this.generateCirclesLines()
        this.checkSuccess()
    }

    render() {
        // 循环所有circle节点
        for (let i = 0; i < this.Circles.length; i++) {
            // 获取当前circle
            const circle = this.Circles[i]
            // 使用前清除所有子内容
            circle.node.destroyAllChildren()

            // 获取当前旗帜内容节点索引
            const contentIndex = DataManager.Instance.H2AData[i]
            if (contentIndex !== null && this.ContentPrefab[contentIndex]) {
                // 实例化对应预制体
                const content = instantiate(this.ContentPrefab[contentIndex])
                circle.node.addChild(content)
            }
        }
    }

    handleCircleTouch (event) {
        // 获取当前点击的circle
        const circle: Node = event.target
        // 如果索引为空表示 为null节点
        if (!circle.children.length) return
        // 获取当前点击的circle索引
        let currentTouchCircleIndex = circle.getComponent(CircleManager).index
        // 获取链接的circle节点索引
        let movableCirclesIndex = this.circleMap[currentTouchCircleIndex]

        // 可移动状态
        let status = false
        let rememberIndex = -1
        // 遍历可移动的circle
        movableCirclesIndex.map(circleIndex => {
            if (DataManager.Instance.H2AData[circleIndex] === null) {
                status = true
                rememberIndex = circleIndex
            }
        })

        if (!status) return

        // 修改移动节点索引为当前节点中旗帜内容
        DataManager.Instance.H2AData[rememberIndex] = circle.children[0].getComponent(ContentManager).index
        DataManager.Instance.H2AData[currentTouchCircleIndex] = null
        DataManager.Instance.H2AData = [ ...DataManager.Instance.H2AData ]

        this.checkSuccess()
    }

    checkSuccess () {
        // 如果完成游戏则解绑
        if (JSON.stringify(DataManager.Instance.H2AData) === JSON.stringify(DataManager.Instance.H2AAnswer)) {
            for (let i = 0; i < this.Circles.length; i++) {
                const circleItem = this.Circles[i]
                circleItem.index = i
                // 添加点击内容
                circleItem.node.off(Node.EventType.TOUCH_END, this.handleCircleTouch, this)
            }

            // 更改门的状态
            DataManager.Instance.DoorState = TRIGGER_STATE_ENUM.RESOLVED
            // 跳转场景
            DataManager.Instance.CurrentScene = SCENE_ENUM.H2
        }
    }

    resetH2AData () {
        console.log(DataManager.Instance.H2AData)
        console.log(DataManager.Instance.H2AInit)
        DataManager.Instance.H2AData = [ ...DataManager.Instance.H2AInit ]
    }

    generateCircleMap () {
        // this.circleMap = [
        //     [1, 4, 6],
        //     [0, 5, 6],
        //     [4, 6],
        //     [5, 6],
        //     [0, 2, 5, 6],
        //     [1, 3, 4, 6],
        //     [0, 1, 2, 3, 4, 5]
        // ]
        for (let i = 0; i < this.Circles.length; i++) {
            const circle = this.Circles[i]
            circle.index = i
            // 添加点击内容
            circle.node.on(Node.EventType.TOUCH_END, this.handleCircleTouch, this)
        }
    }

    generateCirclesLines() {
        // 获取当前索引
        for (let currentIndex = 0; currentIndex < this.Circles.length; currentIndex++) {
            // 遍历记录图谱
            for (let computedIndex = 0; computedIndex < this.circleMap[currentIndex].length; computedIndex++) {
                // 获取将要链接的索引
                let nextIndex = this.circleMap[currentIndex][computedIndex];
                // 单方面链接
                if (currentIndex < nextIndex) {
                    this.generateLine(this.Circles[currentIndex], this.Circles[nextIndex]);
                }
            }
        }
    }

    generateLine(currentCircle: CircleManager, nextCircle: CircleManager) {
        const line = instantiate(this.LinePrefab);


        const {x: x1, y: y1} = currentCircle.node.position;
        const {x: x2, y: y2} = nextCircle.node.position;

        // 线的位置在中心点
        const x = (x1 + x2) / 2;
        const y = (y1 + y2) / 2;
        line.setPosition(x, y);

        // 对边
        const opposite = Math.abs(x1 - x2);
        // 临边
        const adjacent = Math.abs(y1 - y2);
        // 斜角边
        const distance = Math.sqrt(Math.pow(opposite, 2) + Math.pow(adjacent, 2));

        const uiTransform = line.getComponent(UITransform)
        // 设置线长
        uiTransform.setContentSize(distance - 2 * CIRCLE_RADIUS, uiTransform.contentSize.height)

        // 判断象限正负角
        const sign = (x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2) ? 1 : -1;
        // 旋转度数
        const angle = Math.atan(adjacent / opposite) * 180 / Math.PI;
        // 使用欧拉角获取旋转度数
        line.setRotationFromEuler(0, 0, sign * angle)

        this.Lines.addChild(line);
    }
}


