import { response } from "express";
import Story from "../models/storyContent.js";
import mongoose from "mongoose";

const getStories = async (request,response)=>{
    
    try{
        const story=await Story.find();  //returns an array of all the records of stories
        response.status(200).json(story);
        console.log(response);
    }catch(error){
        response.status(404).json({message: error.message});
    }
}

const createStory = async (request, response) => {
    const body = request.body;
    const newStory = new Story({
        ...body,
        userId: request.userId,
        postDate: new Date().toISOString()
    });
    try {
        await newStory.save(); // saving the newStory in the database 
        console.log("Saved in database:", newStory);
        response.status(201).json(newStory);
    } catch (error) {
        console.error("Error creating story:", error);
        response.status(409).json({ message: error.message });
    }
}


const updateStory=async(request,response)=>{
    const {id:_id}=request.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return response.status(404).send("This Id does not belong to any story");       
    }
    const story=request.body;
    const updatedStory=await Story.findByIdAndUpdate(_id,story,{new:true});
    response.json(updatedStory);
}

const deleteStory=async(request,response)=>{
    const {id:_id}=request.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return response.status(404).send("This Id does not belong to any story");       
    }

    await Story.findByIdAndDelete(_id);
    response.json({message:"Story deleted succesfully"});
}



const likeStory = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated User" });

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("This id doesnt belong to any story");
    }

    const story = await Story.findById(id);

    const index = story.likes.findIndex(id => id === String(req.userId));

    if (index === -1) { // if user has not liked the story
        story.likes.push(req.userId);
    } else {
        story.likes = story.likes.filter(id => id !== String(req.userId));
    }

    const updatedStory = await Story.findByIdAndUpdate(id, story, { new: true });

    res.json(updatedStory);
}


export {getStories,createStory,updateStory,deleteStory,likeStory};