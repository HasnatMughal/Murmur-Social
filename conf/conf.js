const conf = {
    appwrite_Url : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProject_id : String(import.meta.env.VITE_PROJECT_ID),
    appwriteDatabase_id : String(import.meta.env.VITE_DATABASE_ID),
    appwriteBucket_id : String(import.meta.env.VITE_BUCKET_ID),
    appwriteCollection_id : String(import.meta.env.VITE_COLLECTION_ID),
}

export default conf