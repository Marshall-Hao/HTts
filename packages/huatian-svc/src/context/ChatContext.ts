

/*
 * @Author: your name
 * @Date: 2022-01-08 17:03:00
 * @LastEditTime: 2022-01-10 18:23:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-svc/src/context/ChatContext.ts
 */


// * 处理流 处理网络 处理存贮 不处理MODEL
import { Message } from "@huatian/model"
import { sensitiveHeaders } from "http2"
import { UserRepository } from "../repo/UserRepository"
import { ChatIDService } from "../service/ChatIDService"
export class ChatContext {
    private static inst = new ChatContext()
    private repo = UserRepository.getInstance()
    public static getInstance() {
        return ChatContext.inst
    }

    public async send(uid:number, msg: Message) {
        const sentMsg = {...msg}
        const toReceiveMsg = {...msg}
        sentMsg.id = await ChatIDService.getInstance().getId()
        console.log(sentMsg)
        toReceiveMsg.id = await ChatIDService.getInstance().getId()
        msg.from = uid
        const from = this.repo.getUser(msg.from)
        const to = this.repo.getUser(msg.to)
        const session = from.chat().createChatSession(to)
        session.chat(sentMsg,toReceiveMsg)
        console.log(sentMsg.id)
        return sentMsg.id
    }

    public async read(uid:number,  lastId: number) {
        const user = this.repo.getUser(uid)
        return user.chat().unReadMessage(lastId)
    }
}