import express from 'express';

import { createPost,getPost,deletePost,likePost,replyToPost ,getFeedPosts,getUserPosts} from '../controller/postController.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.get("/feed",protectRoute,getFeedPosts)
router.get("/:id",getPost)
router.get("/user/:username",getUserPosts)
router.post('/create',protectRoute, createPost);
router.put('/like/:id',protectRoute, likePost);
router.put('/reply/:id',protectRoute, replyToPost);
router.delete("/:id",protectRoute,deletePost);


export default router