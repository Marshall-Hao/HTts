

/*
 * @Author: your name
 * @Date: 2022-01-08 17:03:00
 * @LastEditTime: 2022-01-08 18:40:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-svc/src/context/ChatContext.ts
 */

import { Message } from "@huatian/model"
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
        return sentMsg.id
    }
}