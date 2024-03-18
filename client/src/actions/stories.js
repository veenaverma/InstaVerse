import * as api from "../api";
import {
    FETCH_ALL_STORIES,
    CREATE_STORY,
    UPDATE_STORY,
    DELETE_STORY,
    LIKE_STORY
} from "../constants/actionTypes";
 
export const getStories = () => async(dispatch)=>{
    try
    {
        const response = await api.fetchStories();
    console.log("API Response:", response);

    const { data } = response;
    console.log("Received stories data:", data);
        dispatch({
            type:FETCH_ALL_STORIES,
            payload:data
        });
    }catch(error){
        console.log(error.message);
    }
};

export const createStory = (story) => async(dispatch)=>{
    try
    {
        const {data} = await api.createStory(story);
        dispatch({
            type:CREATE_STORY,
            payload:data
        });
    }catch(error){
        console.log(error.message);
    }
};
export const updateStory=(id,story)=>async(dispatch)=>{
    console.log(id,story);
    // if (!story || !story._id) {
    //     console.error("Story object must have a valid _id property");
    //     return;
    //   }

    try
    {
        const {data} = await api.updateStory(id,story);
        dispatch({
            type:UPDATE_STORY,
            payload:data
        });
        console.log("Update processing");
    }catch(error){
        console.log(error.message);
    }
}

export const deleteStory=(id)=>async(dispatch)=>{
    try
    {
        await api.deleteStory(id);
        dispatch({
            type:DELETE_STORY,
            payload:id
        });
    }catch(error){
        console.log(error.message);
    }
}

export const likeStory=(id)=>async(dispatch)=>{
    try
    {
        console.log("api called");
        const {data} = await api.likeStory(id);
        dispatch({
            type:LIKE_STORY,
            payload:data
        });

    }catch(error){
        console.log(error.message);
    }
}