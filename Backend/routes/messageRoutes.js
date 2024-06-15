import express from "express"
import protectRoute from "../middleware/protectRoute.js"
import { getMessages, sendMessage,getConversation } from "../controller/messageController.js"

const router=express.Router()

router.post('/',protectRoute,sendMessage);
router.get('/conversation',protectRoute,getConversation);

router.get('/:otherUserId',protectRoute,getMessages);

export default router