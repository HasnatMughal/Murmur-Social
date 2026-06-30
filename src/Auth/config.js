import {Client, ID, Storage, Databases, Query} from "appwrite"
import conf from "../../conf/conf"

export class DatabaseService{
    client = new Client()
    database;
    storage;

    constructor(){
        this.client.setEndpoint(conf.appwrite_Url)
        this.client.setProject(conf.appwriteProject_id)

        this.storage = new Storage(this.client)
        this.database = new Databases(this.client)
    }

    async createPost({text,  authorName, authorId, imgUrl, comments, likes, shares,likedUsers }){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabase_id,
                conf.appwriteCollection_id,
                ID.unique(),{
                    text, authorName, authorId, imgUrl,comments, likes, shares,  likedUsers
                }
                
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(id){
        try {
          return  await this.database.deleteDocument(
                conf.appwriteDatabase_id,
                conf.appwriteCollection_id,
                id
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(id,{text,imgUrl, comments ,likes, shares , likedUsers }){
        try {
           return await this.database.updateDocument(
                conf.appwriteDatabase_id,
                conf.appwriteCollection_id,
                id,{text, imgUrl,comments, likes, shares, likedUsers})
        } catch (error) {
            throw error
        }
    }

    async uploadImageFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucket_id,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }
    async deleteImageFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucket_id,
                fileId
            )
        } catch (error) {
            throw error
        }
    }

    showImage(fileId) {
    return this.storage.getFileView(
        conf.appwriteBucket_id,
        fileId
    )
    }

    async listAllPosts(){
        try {
          return await this.database.listDocuments(
                conf.appwriteDatabase_id,
                conf.appwriteCollection_id,

            )
        } catch (error) {
            throw error
        }
    }

    async listUserPosts(authorName){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabase_id,
                conf.appwriteCollection_id,
                [Query.equal("authorName",authorName)]
            )
        } catch (error) {
            throw error
        }
    }

    async showPost(id){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabase_id,
                conf.appwriteCollection_id,
                id
            )
        } catch (error) {
            throw error
        }
    }

    
}

const databaseService = new DatabaseService()
export default databaseService