/*
 * @Author: your name
 * @Date: 2022-01-08 04:40:07
 * @LastEditTime: 2022-01-08 05:19:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /huatianClone/packages/huatian-svc/src/dao/Token.ts
 */
import crypto from 'crypto'

type TokenObject = {
    uid: number,
    token: string,
    expires: number
}

export class Token {
    static inst : Token = new Token()

    static getInstance() {
        return Token.inst
    }

    private cache: Record<string, TokenObject> = {}

    private create(uid : number) {
        const token = Math.random() + "-" + new Date().getTime()

        const expires = new Date().getTime() + 3600 * 24

        const sha = crypto.createHash('sha1')
        sha.update(token)
        const hash = sha.digest('hex')


        const tokenObject = {
            uid,
            token: hash,
            expires
        }
        this.catchSet(tokenObject.token, tokenObject)
        return tokenObject
    }

    private catchSet(hash: string, token: TokenObject) {
        this.cache[hash] = token
    }
    
    private catchGet(hash: string) {
        return this.cache[hash] || null
    }

    public getToken(hash: string) {
        const token = this.catchGet(hash)
        if (!token) {
            return null
        }

        if (token.expires > new Date().getTime()) {
            return token
        }
        return null
    }
    public refreshToken(uid: number) {
        return this.create(uid)
    }
}