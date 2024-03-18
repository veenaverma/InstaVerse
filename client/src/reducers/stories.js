import {
    FETCH_ALL_STORIES,
    CREATE_STORY,
    UPDATE_STORY,
    DELETE_STORY,
    LIKE_STORY
} from"../constants/actionTypes";

const storyReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_STORIES:
            // console.log("FETCH_ALL_STORIES:", action.payload);
            return action.payload;
        case CREATE_STORY:
            // console.log("CREATE_STORY:", action.payload);
            return [...state, action.payload];
        case LIKE_STORY:
        case UPDATE_STORY:
            // console.log("UPDATE_STORY:", action.payload);
            return state.map(story=>story._id === action.payload._id?action.payload:story);
        
        case DELETE_STORY:
            return state.filter(story=>story._id !== action.payload);

        default:
            return state;
    }
};

export default storyReducer;