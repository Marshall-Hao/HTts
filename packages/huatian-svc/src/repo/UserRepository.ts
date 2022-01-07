/*
 * @Author: your name
 * @Date: 2022-01-08 04:01:59
 * @LastEditTime: 2022-01-08 04:36:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-svc/src/repo/UserRepository.ts
 */
import { User } from '@huatian/model'
export class UserRepository {

    private users: Record<number, User> = {}
    public static inst = new UserRepository()

    public static getInstance() {
        return UserRepository.inst
    }
    
    public getUser(uid: number) : User;
    public getUser(user: string, passwd: string): User;
    public getUser(identity: number | string, passwd? : string) : User {
        if (typeof identity === "number") {
            const uid = identity 
            
            if(this.users[uid]) {
                return this.users[uid]
            }

            const newUser = new User(uid)
            this.users[uid] =  newUser
            return newUser
        } else {
            const user = identity
            const idmap = {
                "Marshall": 1,
                "Kevin": 2,
                "Kris": 3
            }

            return this.getUser(idmap[user] || 1)
        }
    }
    
}