import bcrypt from 'bcrypt'
import jwt, {decode} from 'jsonwebtoken'
import Bluebird from 'bluebird'
import {User, UserInterface, UserAddInterface, UserViewInterface} from "../models/users_model";

export class UserController{
    private readonly _saltRounds = 12;
    private readonly _jwtSecret = '0.rfyj3n9nzh'

    static get userAttributes(){
        return ['id','email']
    }
    private static _user
    static get user(){
        return UserController._user
    }

    register({email, password}: UserAddInterface ){
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
                return User.create({email, password : hash})
            })
    }

    login({email}: UserAddInterface){
        return User.findOne({where: {email}}).then(u => {
            const {id, email} = u!
            return{token: jwt.sign({id, email}, this._jwtSecret)}
        })
    }

    verifyToken(token:string){
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret, (err, decode)=>{
            if (err){
                resolve(false)
                return
            }
            // @ts-ignore
                UserController._user = User.findByPk(decode([`id`]) as any)
            resolve(true)
            return;
        })
    })  as Promise<boolean>
  }

  getUserById(id:number){
        return User.findByPk(id, {
            attributes: UserController.userAttributes
        }) as Bluebird<UserViewInterface>
  }

}
