import { User } from "./User";

/*
 * @Author: your name
 * @Date: 2022-01-07 04:10:35
 * @LastEditTime: 2022-01-07 04:27:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-model/src/ChatSession.ts
 */
import { Message} from './Messages'

export class ChatSession {
    private from : User
    private to: User
    public constructor(from: User, to: User) {
        this.from = from
        this.to = to
    }

    public chat(msg: Message) {
        this.from.chat().send(msg)
        this.to.chat().receive(msg)
    }
}