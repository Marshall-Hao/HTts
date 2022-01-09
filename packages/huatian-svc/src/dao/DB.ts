import path from "path/posix"
import { Sequelize } from "sequelize"

/*
 * @Author: your name
 * @Date: 2022-01-08 17:23:58
 * @LastEditTime: 2022-01-08 17:59:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-svc/src/dao/DB.ts
 */

export class DB {
    static sequelize: Sequelize

    static getSequelize() {
        if (!DB.sequelize) {
            DB.sequelize = new Sequelize({
                dialect: "sqlite",
                storage: path.resolve(__dirname, "mydb.db")
            })
        }
        return DB.sequelize
    }
}