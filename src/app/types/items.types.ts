export type TItem = {
    type: keyof typeof Item
    name: string
}

export enum Item {
    'Fruit' = 'Fruit',
    'Vegetable' = 'Vegetable'
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TCallback = (...arg: any[]) => void

export type TaskParams = [
    durations: number,
    callback: TCallback
]