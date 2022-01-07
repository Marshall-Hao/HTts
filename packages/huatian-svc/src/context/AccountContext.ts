/*
 * @Author: your name
 * @Date: 2022-01-08 03:59:27
 * @LastEditTime: 2022-01-08 04:36:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-svc/src/context/AccountContext.ts
 */
import { User } from "@huatian/model"
import {UserRepository} from "../repo/UserRepository"

export class AccountContext {
    private static inst : AccountContext
    private repo: UserRepository = UserRepository.getInstance()

    public static getInstance() {
        if (!AccountContext.inst) {
            AccountContext.inst = new AccountContext()
        }
        return AccountContext.inst
    }

    public async verify(uname: string, passwd: string) {
        const user = this.repo.getUser(uname, passwd)
        return user
    }
}