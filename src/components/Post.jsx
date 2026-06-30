import React, { useEffect, useState } from "react";
import databaseService from "../Auth/config";
import Input from "./Input";
import Comment from "./Comment";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import authentication from "../Auth/auth";
import PostTime from "./PostTime";
import Comments from "./Comments";

function Post({ postkiId,  }) {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  
  
 
  async function getPost() {
    try {
      const postFetch = await databaseService.showPost(postId);
      if (postFetch) {
        // console.log("post fetch success", postFetch);
        setPost(postFetch);
      
        
      }
    } catch (error) {
      console.log(error);
    }
  }
   const [createdAtTime, setCreatedAtTime] = useState('')
   

  const [currentUserId, setCurrentUserId] = useState('')
  async function getCurrentUser(){
    try {
     const fetchedUser =  await authentication.checkUser()
     if(fetchedUser){
      setCurrentUserId(fetchedUser.$id)
     }
    //  if(likedUsersVar.includes(fetchedUser.$id)){
    //   setLikedStatus(true)
    //  } else{
    //   setLikedStatus(false)
    //  }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getCurrentUser()

    if(post.likedUsers && post.likedUsers.includes(currentUserId)){
      setLikedStatus(true)
    } else{
      setLikedStatus(false)
    }
  }, [currentUserId, post.likedUsers])

  

  useEffect(() => {
    getPost()
  
  }, [postId]);

  // console.log(post);
  const [commentsVar, setCommentsVar] = useState([]);
  const [fetchedComments, setFetchedComments] = useState(
    post.comments ? post.comments : [],
  );
  const [comment, setComment] = useState("");
  const [likesVar, setLikesVar] = useState(
    post.likes ? parseInt(post.likes) : 0,
  );

  
  const [likedUsersVar, setLikedUsersVar] = useState(post.likedUsers ?? [])

 



  const [likedStatus, setLikedStatus] = useState(false)
  const [disabled, setDisabled] = useState(false)
  

//   console.log(typeof post.likes);
//   console.log(typeof likesVar);
//   console.log(likesVar);

  const [sharesVar, setSharesVar] = useState(post.shares);
  const authorName = post? post.authorName : ""
  // const author = useSelector((state) => state.auth.userData);
  // const authorName = author ? author.name : "";

  const [viewComments, setviewComments] = useState(false)

  useEffect(() => {
    if(post.comments){
        setFetchedComments(post.comments)
        setCommentsVar(post.comments)
    }
    if(post.likes){
        setLikesVar(post.likes)
    }
    if(post.likedUsers){
      setLikedUsersVar(post.likedUsers)
    }
    if(post.$createdAt){
      setCreatedAtTime(post.$createdAt)
    }
  },[post.comments, post.likes, post.likedUsers, post.$createdAt])

  async function updateLikes(){

    
    if(likedUsersVar.includes(currentUserId)){
       const newLikes = parseInt(likesVar) - 1
           setLikesVar(newLikes)
           const updatedLikedUsers = likedUsersVar.filter((likedUser) => likedUser !== currentUserId)
            setLikedUsersVar(updatedLikedUsers)
            setLikedStatus(false)
    try {
        const updateLike = await databaseService.updatePost(postId,{
            likes: newLikes,
            comments: commentsVar,
            likedUsers: updatedLikedUsers
        })
        
    
    } catch (error) {
        console.log(error);
        
    }
        return
    } else if(!likedUsersVar.includes(currentUserId)){

        const newLikes = parseInt(likesVar) + 1
    setLikesVar(newLikes)
    const updatedLikedUsers = [...likedUsersVar, currentUserId]
    setLikedUsersVar(updatedLikedUsers)
    setLikedStatus(true)
    try {
        const updateLike = await databaseService.updatePost(postId,{
            likes: newLikes,
            comments: commentsVar,
            likedUsers:updatedLikedUsers
        })
        
    if(updateLike){
 
    }
    } catch (error) {
        console.log(error);
        
    }
    }
    
  }

  async function updateComments() {
    try {
      if(comment === ""){
        setDisabled(true)
        return
      }
      const updatedComments = [...commentsVar, comment]
      const updateComment = await databaseService.updatePost(postId, {
        comments: updatedComments,
        likes: likesVar,
      });
      if (updateComment) {
        setCommentsVar(updatedComments);
        setFetchedComments(updatedComments);
        // console.log("success");
      }
      setComment("");
    } catch (error) {
      console.log(error);
    }
  }

  // console.log("comments",commentsVar);

  if (!post || !post.imgUrl) return null;

  const imageFile = databaseService.showImage(post.imgUrl);


  return (
    <div className="flex flex-col max-w-6xl mx-auto p-4 md:min-h-3/4 bg-white mt-5">
      <div className="flex flex-col md:flex-row gap-4 border border-gray-200 rounded-2xl ">
        <div className=" w-full md:w-1/3 md:h-11/12  p-2">
          <img
            src={imageFile}
            alt=""
            className="w-full h-full rounded-2xl object-cover"
          />
        </div>
        <div className=" flex flex-col mt-5 items-start gap-2">
          <div className="flex  flex-row   gap-2 ">
            <div className="bg-gray-900 uppercase flex items-center justify-center text-white w-12 h-12 rounded-full text-xl font-semibold">
              {authorName.slice(0, 2)}
            </div>
            <div className="flex flex-col items-start">
            <h1 className="capitalize">{authorName}</h1>
            <PostTime createdAt={createdAtTime} />
            </div>
          </div>

          <div>
            <p className="">{post.text}</p>
          </div>
            <p className="text-gray-600 text-xs">{likesVar} Likes</p>
          <div className="flex items-center border-t border-b border-gray-200 w-full gap-16  p-2">
            <button
              className={`${likedStatus === true ? "text-blue-400" : "text-gray-800"} hover:bg-gray-300 px-3 py-2`}
              onClick={
              updateLikes
              }
            >
             Like
            </button>
            <button className=" hover:bg-gray-300 px-3 py-2" onClick={() => setviewComments(!viewComments)}> Comments</button>
            <p className=" hover:bg-gray-300 px-3 py-2">{sharesVar} Share</p>
          </div>
          <form action="" onSubmit={(e) => {
            e.preventDefault()
            updateComments()
            setComment('')}} className="flex items-center">
            <Input placeholder={"Write a comment"} onChange={(e) => setComment(e.target.value)} value={comment} />
            <button className="bg-blue-400 hover:bg-blue-600 text-white rounded-2xl px-4 py-2" type="submit">Comment</button>
          </form>
          <div className="flex flex-col items-start w-full gap-2">
           
            {/* <button className="hover:bg-gray-100 p-2"  onClick={() => setviewComments(!viewComments)}>Comments</button> */}
            {viewComments === true && (
              <div className="p-3 flex flex-col justify-between gap-2">
                <Comments comments={fetchedComments} authorName={authorName}  />
            {/* {fetchedComments
              ? fetchedComments.map((comment, index) => {
                  return (
                    <li key={index}>
                      <Comment authorName={authorName} comment={comment}/>
                    </li>
                  );
                })
              : null} */}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
