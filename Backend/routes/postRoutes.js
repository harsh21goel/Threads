import express from 'express';

import { createPost,getPost,deletePost,likePost,replyToPost ,getFeedPosts} from '../controller/postController.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.get("/feed",protectRoute,getFeedPosts)
router.get("/:id",protectRoute,getPost)
router.post('/create',protectRoute, createPost);
router.post('/like/:id',protectRoute, likePost);
router.post('/reply/:id',protectRoute, replyToPost);
router.delete("/:id",protectRoute,deletePost);


export default router