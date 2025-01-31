export type TData = {
    male: number
    female: number
    ageRange: string
    hair: { [key: string]: number }
    addressUser: { [key: string]: string }
}


export type TNormalize = { [department: string]: TData }