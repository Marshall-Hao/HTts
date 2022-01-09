/*
 * @Author: your name
 * @Date: 2022-01-08 17:55:35
 * @LastEditTime: 2022-01-08 17:55:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-svc/src/dao/create_db.ts
 */
import { ChatIDSetDao } from "./Dao";

ChatIDSetDao.sync({force: true})