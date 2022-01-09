/*
 * @Author: your name
 * @Date: 2022-01-08 17:06:08
 * @LastEditTime: 2022-01-08 18:31:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-svc/src/service/ChatIDService.ts
 */
import { ChatIDSetDao } from "../dao/Dao"
import { DB } from "../dao/DB"
const STEP:number = 100000
export class ChatIDService {
    private static inst: ChatIDService = new ChatIDService()

    private id_base : number = -1
    private id_start = 0

    public static getInstance() {
        return ChatIDService.inst
    }

    // * get the set of the ids, ex: 0 ~ 99999
    public async requestIdSet() {
        if (this.id_base >= this.id_start && this.id_base < (this.id_start + STEP)) {
            return
        }
        const sequelize = DB.getSequelize()
        const transaction = await sequelize.transaction()

        try {

            // 0 -----> 1000000
            // 0 -----> 1000000 ?
            const lastRecord =  await ChatIDSetDao.findOne({
                order: [["id", "desc"]],
                // * 数据库上锁
                lock: transaction.LOCK.UPDATE
            })
    
            const startNumber = lastRecord ? lastRecord.getDataValue("start") + 100000 :
            0
    
            await ChatIDSetDao.create({
                app: "test",
                start: startNumber,    
            })

            this.id_start =  startNumber
            this.id_base =  startNumber
        } catch(ex) {
            console.error(ex)
            transaction.rollback()
        }
    
    }

    public async getId() {
        return this.id_base ++
    }
}