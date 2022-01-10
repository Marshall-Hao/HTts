/*
 * @Author: your name
 * @Date: 2022-01-08 03:31:58
 * @LastEditTime: 2022-01-10 18:22:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-svc/src/main.ts
 */
import express, 
    {
    Request, 
    Response, 
    NextFunction
    } from 'express'

import cookieParser from 'cookie-parser'
import { AccountContext } from './context/AccountContext'
import { Token } from './dao/Token'
import { ChatContext } from './context/ChatContext'
import { Message } from '@huatian/model'
const app = express()
app.use(cookieParser())

type LoggedInRequest = Request & {uid : number}


async function sendStdResponse<T>(res: Response,  f: T)
async function sendStdResponse(res:Response, f: Promise<any>)
async function sendStdResponse(res:Response, f: () => Promise<any>)
async function sendStdResponse(res: Response, f: any) {
    try {
        console.log(typeof f)
        let data = typeof f === 'function' ? f() : f
        if (data instanceof Promise) {
            data = await data
            console.log("this is", data)
        }
        res.status(200).send({
            success: true,
            data: data
        })
    } catch (ex: any) {
        console.error(ex)
        res.status(500).send({
            success: false,
            message: ex.toString()
        })
    }
}
function token(req: Request & {uid:number}, res: Response, next: NextFunction) {
    const tokenHash = req.cookies['x-token'] as string
    console.log({tokenHash})
    const token = Token.getInstance()

    const tokenObject =  token.getToken(tokenHash)
    if (tokenObject === null) {
        res.status(401).send({
            success: false
        })
        return
    }

    req.uid = tokenObject.uid
    next()
}

app.get('/foo', token, (req: Request & {uid:number}, res: Response) => {
    res.send(req.uid + "-ok")
})

app.post('/token', express.json(), async (req, res) => {
    const {uname, pwd} = req.body
    const account = AccountContext.getInstance()
    const user = await account.verify(uname,pwd)
    const token= Token.getInstance()
    const tokenObject = token.refreshToken(user.getId())
    res.cookie("x-token", tokenObject.token)
    sendStdResponse(res, "ok")
})

app.post("/message", token, express.json(), async (req:LoggedInRequest, res:Response) => {
    const uid = req.uid

    const chatContext = ChatContext.getInstance()

    sendStdResponse(res, async() => {
       return await chatContext.send(uid, req.body as Message)
    })
})

app.get('/message',token,async(req:LoggedInRequest, res) => {
    const uid = req.uid
    
    const lastId = parseInt(req.query.last_id as string) || 0

    console.log({uid, lastId})

    const chatContext = ChatContext.getInstance()

    sendStdResponse(res, () => {
        return chatContext.read(uid, lastId)
    })
} )

app.listen(6001, ()=> {
    console.log('listen at 6001')
})