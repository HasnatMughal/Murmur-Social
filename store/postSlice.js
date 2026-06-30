import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    posts : [{
        id: 1, 
        text : "Dummy text",
        imgUrl : null,
        likes: null,
        comments :null,
        shares: null,
        authorName : "Someone"
    }]
}

const postSlice = createSlice({
    name : 'posts',
    initialState,
    reducers: {
        addPost : (state, action) => {
            state.posts.push(action.payload.post)
            
        },
        removePost : (state, action) => {
          state.posts = state.posts.filter((post) => {
                post.id !== action.payload.id
            })
        },
        updatePost : (state, action) => {
           state.posts = state.posts.map((post) => {
                post.id === action.payload.id ? action.payload : post
            })
        }
    }
})

export const {addPost, removePost, updatePost} = postSlice.actions
export default postSlice.reducer