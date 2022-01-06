/*
 * @Author: your name
 * @Date: 2022-01-07 03:58:59
 * @LastEditTime: 2022-01-07 04:31:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-model/src/UserChat.ts
 */
import { ChatSession } from './ChatSession'
import {Message,MessageStatus, MessageType} from './Messages'
import {User} from './User'
export class UserChat {
    private user : User
    private msgs : Message[]
    private sessions : Record<number, ChatSession> = {}
    constructor(user: User) {
        this.user = user
    }

    public createChatSession(to: User) {
        if (this.sessions[to.getId()]) {
            return this.sessions[to.getId()]
        }
        const session = new ChatSession(this.user, to)
        this.sessions[to.getId()] = session
        return session
    }

    public send(msg: Message) {
        this.msgs.push(msg)
        msg.status =  MessageStatus.SENDING
        msg.type = MessageType.SEND
    }

    public receive(msg: Message) {
        this.msgs.push(msg)
        msg.status = MessageStatus.RECEIVED
        msg.type = MessageType.RECEIVED
    }

    public readTo(lastId : number) {
        const unreads =  this.msgs.filter(x => x.id <= lastId && x.status === MessageStatus.RECEIVED)
        unreads.forEach(msg => {
            msg.status = MessageStatus.READED
        })
    }

    public unReadMessage(lastId : number) {
        return this.msgs.filter(x => x.id > lastId)
    }
}