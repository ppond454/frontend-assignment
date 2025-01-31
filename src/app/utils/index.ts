import { TaskParams } from "../types"

export class Task {
    constructor(...task: TaskParams) {
        this.task = task
        this.timer = null
    }
    private task: TaskParams
    private timer: ReturnType<typeof setTimeout> | null

    start() {
        this.timer = setTimeout(this.task[1], this.task[0])
    }

    kill() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }
}

