import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Container from "../components/Container/Container";
import Input from "../components/Input";
import { Link, useParams } from "react-router";
import databaseService from "../Auth/config";
import Postcard from "../components/Postcard";
import { useSelector } from "react-redux";
import Trending from "../components/Trending";

function Homepage() {
  const [postsVar, setPostsVar] = useState([]);
  const [commentsVar, setCommentsVar] = useState([]);
  const [likesVar, setLikesVar] = useState(null);
  const [sharesVar, setSharesVar] = useState(null);
  const { authorName } = useParams();
  const [loading, setLoading] = useState(true);

  // console.log(postsVar);
  const author = useSelector((state) => state.auth.userData);
  const authorKaName = author ? author.name : "";

  const sp = authorKaName.slice(0, 2);

  const fetchPosts = async () => {
    try {
      const fetchingPosts = await databaseService.listAllPosts();
      setPostsVar(fetchingPosts.documents);
      setLoading(false)
    } catch (error) {}
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 min-h-screen">
        <div className="flex flex-col w-full   items-center gap-2">
          <div className=" flex w-full min-w-96 rounded-2xl items-center gap-4 flex-row justify-center bg-gray-100 px-3 py-2 ">
            <Link to={`/feed/profile/${authorKaName}`}>
              <div
                className="w-8 h-8 rounded-full flex items-center bg-gray-900 capitalize text-white justify-center"
                alt=""
              >
                {sp}
              </div>
            </Link>

            <Link to="/feed/createPost">
              <Input
                className={"w-full"}
                placeholder="What's on your mind today?"
              />
            </Link>
          </div>
          <div className=" flex flex-col   gap-1 items-center">
            {loading === true ? (<p>Loading...</p>) : postsVar.length > 0
              ? postsVar.map((post) => {
                  // console.log(post);
                  return (
                    <li key={post.$id} className="w-full">
                      <Postcard
                        id={post.$id}
                        textContent={post.text}
                        imgUrl={post.imgUrl}
                        authorName={post.authorName}
                        likes={post.likes}
                        comments={post.comments.length}
                        likedUsers={post.likedUsers}
                        createdAt = {post.$createdAt}
                      />
                    </li>
                  );
                })
              : []}
          </div>
        </div>
        <div className=" flex flex-col hidden  lg:block items-center">
          <h1 className="text-3xl text-center">Trending</h1>
          <Trending />
        </div>
      </div>
    </>
  );
}

export default Homepage;
