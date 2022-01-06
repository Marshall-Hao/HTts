/*
 * @Author: your name
 * @Date: 2022-01-07 04:01:23
 * @LastEditTime: 2022-01-07 04:08:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-model/Messages.ts
 */

export enum MessageStatus {
    SENDING = 0,
    SENT,
    RECEIVING,
    RECEIVED,
    READED,
    ERROR
}

export enum MessageType {
    SEND = 0,
    RECEIVED,
    SYSTEM,
    NOTIFY
}

export interface MessageData {
    id :number,
    status: MessageStatus,
    type : MessageType,
    from: number,
    to: number,
}

export interface TextMessage extends MessageData {
    msg: string,
}

export interface ImageMessage extends MessageData {
    url: string
}

export type Message = TextMessage | ImageMessage