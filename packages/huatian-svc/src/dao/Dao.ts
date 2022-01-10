/*
 * @Author: your name
 * @Date: 2022-01-08 17:37:15
 * @LastEditTime: 2022-01-10 17:56:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-svc/src/dao/Dao.ts
 */
// * 0 ~ 10w, 10w~ 20w
import {Model, Optional, DataTypes} from 'sequelize'
import { DB } from './DB'
interface ChatIDSetAttributes {
    id : number,
    app : string,
    start : number
}

export class ChatIDSetDao extends Model<ChatIDSetAttributes, Optional<ChatIDSetAttributes, "id">> {

}

ChatIDSetDao.init({
    id : {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    app : {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    start : {
        type: DataTypes.BIGINT,
        allowNull: false
    },
},{
    sequelize: DB.getSequelize(),
    tableName: "id_set"
})