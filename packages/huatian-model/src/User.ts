/*
 * @Author: your name
 * @Date: 2022-01-07 03:53:08
 * @LastEditTime: 2022-01-07 04:25:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-model/src/User.ts
 */

import { UserChat } from "./UserChat"

export class User {
    private id : number
    private _chat : UserChat
    public constructor(id:number) {
        this.id = id
        this._chat = new UserChat(this)
    }

    public getId() {
        return this.id
    }

    public chat() {
        return this._chat
    }
}