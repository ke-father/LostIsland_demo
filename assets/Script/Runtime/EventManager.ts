import Singleton from "db://assets/Script/Base/Singleton";

interface IEventDic {
    func: Function
    // 上下文对象
    ctx: unknown
}

export default class EventManager extends Singleton {
    public static get Instance () {
        return super.getInstance<EventManager>()
    }

    // 事件字典
    private eventDic: Map<string, Array<IEventDic>> = new Map()

    on (eventName: string, func: Function, ctx?: unknown) {
        // 如果时间字典中有该字段
        if (this.eventDic.has(eventName)) {
            // 存储数据
            this.eventDic.get(eventName).push({ func, ctx })
        } else {
            // 新增
            this.eventDic.set(eventName, [{ func, ctx }])
        }
    }

    off (eventName: string, func: Function, ctx?: unknown) {
        if (!this.eventDic.has(eventName)) return
        // 获取索引
        const index = this.eventDic.get(eventName).findIndex((item) => item.func === func && item.ctx === ctx)
        // 删除
        index !== -1 && this.eventDic.get(eventName).splice(index, 1)
    }

    emit (eventName: string, ...params: unknown[]) {
        if (!this.eventDic.has(eventName)) return
        // 遍历
        this.eventDic.get(eventName).forEach(({ func, ctx }) => {
            ctx ? func.apply(ctx, params) : func(params)
        })
    }

    clear () {
        this.eventDic.clear()
    }
}
