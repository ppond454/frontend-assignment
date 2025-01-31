export type TItem = {
    type: keyof typeof Item
    name: string
}

export enum Item {
    'Fruit' = 'Fruit',
    'Vegetable' = 'Vegetable'
}


export type TCallback = (...arg: any[]) => void

export type TaskParams = [
    durations: number,
    callback: TCallback
]