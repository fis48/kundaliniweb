import { ContentImage } from "."

export interface Content {
    company:string
    children?: Content[]
    dateEnd?: number
    dateIni?: number
    id?: string
    images?: ContentImage[]
    isSection: boolean
    isPublic:boolean
    parent?: Content
    publicOrder:number
    latitud?: number
    leadText?: string
    longitud?: number
    mainText?: string
    subtitle?: string
    title: string
}