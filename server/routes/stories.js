import { Router } from "express";
import { getStories, createStory, updateStory,deleteStory,likeStory } from "../controllers/stories.js";
import authentication from "../middleware/authentication.js";

const router = Router();

router.get("/",getStories);
router.post("/",authentication,createStory);
router.patch("/:id",authentication,updateStory);
router.patch("/:id/likeStory",authentication,likeStory);
router.delete("/:id",authentication,deleteStory);

export default router;