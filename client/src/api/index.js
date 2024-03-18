import axios from "axios";


const api = axios.create({baseURL:"http://localhost:5001"});

api.interceptors.request.use((request)=>{
  if(localStorage.getItem("profile")){
    const profile=JSON.parse(localStorage.getItem("profile"));
    request.headers.authorization=`Bearer ${profile.token}`;
  }
  return request;
})

export const fetchStories = async () => {
  try {
    const response = await api.get("/stories");
    return response;
  } catch (error) {
    console.error("Error fetching stories:", error.message);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const createStory = async (newStory) => {

  try {
    const response = await api.post("/stories", newStory);
    console.log(response.data); // Log the response for debugging
    return response.data; // Return the data from the response
  } catch (error) {
    console.log("Error creating story:", error.message);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const updateStory = async (id,story) => {
  console.log(id, story);
  try {
    const response = await api.patch(`${"/stories"}/${id}`, story);
    console.log(response); // Log the response for debugging
    return response; // Return the data from the response
  } catch (error) {
    console.log("Error creating story:", error.message);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const deleteStory = async (id,story) => {
  //console.log(id, story);
  try {
    const response = await api.delete(`${"/stories"}/${id}`, story);
    console.log(response.data); // Log the response for debugging
    return response.data; // Return the data from the response
  } catch (error) {
    console.log("Error creating story:", error.message);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};


//api request sent to the server which recieves a response from the server
//export const likeStory = async(id) => await axios.patch(`${url}/${id}/likeStory`);  // route of likeStory in the server

export const likeStory = async (id) => {
  
  try {
    const response = await api.patch(`${"/stories"}/${id}/likeStory`);
    console.log(response); // Log the response for debugging
    return response; // Return the data from the response
  } catch (error) {
    console.log("Error creating story:", error.message);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const login = async (formValues) => api.post("/user/login", formValues);
export const signup = async (formValues) => api.post("/user/signup", formValues);