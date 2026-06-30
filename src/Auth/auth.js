import {Client, Account , ID} from "appwrite"
import conf from "../../conf/conf"

export class AuthService{
     client = new Client();
     account ;
     constructor(){
        this.client.setEndpoint(conf.appwrite_Url)
        this.client.setProject(conf.appwriteProject_id)

        this.account = new Account(this.client)

     }

     async createAccount({email,password,name}){
        try {
           const userAccount = await this.account.create(ID.unique(), email, password, name)

           if(userAccount){
            return this.login({email, password})
           } else{
            return userAccount
           }
        } catch (error) {
            throw error
        }
     }

     async login({email, password}){
        try {
            const userLogin = await this.account.createEmailPasswordSession(email, password)
            return userLogin
        } catch (error) {
            throw error
        }
     }

     async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
     }
     async checkUser(){
        try {
           return await this.account.get()
        } catch (error) {
            throw error
        }
     }
}

const authentication = new AuthService()

export default authentication